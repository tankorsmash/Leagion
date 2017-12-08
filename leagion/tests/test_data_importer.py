import csv
import time
import datetime

from functools import partial, lru_cache

from django.test import TestCase, override_settings
from django.contrib.auth import get_user_model
from django.core.urlresolvers import reverse

from rest_framework import status
from rest_framework.test import APIRequestFactory, APITestCase, force_authenticate, APIClient
from rest_framework.authtoken.models import Token

from leagion.models import League, Season, Team, Location
User = get_user_model()

from leagion.tests.test_api import CreatorMixin #TODO move this out of there
from leagion.data_imports.template_generation import (
    ColumnData,
    TeamsTemplateGenerator,
    LocationTemplateGenerator,
)

from leagion.utils import generate_locations

NO_DATA = 0xDEADBEEF


class BaseDataExporter(APITestCase, CreatorMixin):
    """
    test the creation of the CSV template for Data Imports
    """

    GeneratorClass = None #ie TeamsTemplateGenerator
    ModelClass = None #ie Team

    def setUp(self):
        self.template_generator = self.GeneratorClass()

    def assertRowMatch(self, row_data, team, col_id, team_attr, expected_data=NO_DATA):
        if expected_data == NO_DATA:
            expected_data = getattr(team, team_attr)

        self.assertEquals(
            getattr(row_data, col_id).data,
            expected_data,
        )

    @lru_cache(maxsize=1000) #high because I'm not sure if child classes reset this counter
    def get_row_instance(self, row_data, col_name):
        """
        gets an instance of the ModelClass from the database based on row_data

        ie
        >>> Team.objects.get(id=row_data.team_id.data)
        """
        id_data = getattr(row_data, col_name).data
        return self.ModelClass.objects.get(id=id_data)


    @lru_cache(maxsize=1000) #high because I'm not sure if child classes reset this counter
    def get_assert_row_partial(self, row_data, instance):
        """
        returns a partially applied function which takes only the col id and
        instance attr name, instead of the row data and instance

        >>> self.assertRowMatch(row_data, team, "team_id", "id")
        >>> self.assertRowMatch(row_data, team, "team_name", "name")
        # becomes
        >>> assert_row = self.get_assert_row_partial(row_data, team)
        >>> assert_row("team_id", "id")
        >>> assert_row("team_name", "name")
        """
        return partial(self.assertRowMatch, row_data, instance)


class TeamExporterTestCase(BaseDataExporter):
    GeneratorClass = TeamsTemplateGenerator
    ModelClass = Team

    def setUp(self):
        super().setUp()

        #generate 5 teams
        self.league = self.create_league()
        self.season = self.create_season(self.league)
        self.teams = []
        for _ in range(5):
            self.teams.append(self.create_team(self.season))

    def test_export_teams_in_league_template(self):
        for row_data in self.template_generator.next_row():
            team = self.get_row_instance(row_data, "team_id")
            assert_row = self.get_assert_row_partial(row_data, team)

            assert_row("team_id", "id")
            assert_row("team_name", "name")

            team_captains_names = ", ".join(cap.full_name for cap in team.captains.all())
            assert_row("team_captain_full_name", None, team_captains_names)
            team_captains_emails = ", ".join(cap.email for cap in team.captains.all())
            assert_row("team_captain_email", None, team_captains_names)



class LocationsExporterTestCase(BaseDataExporter):
    GeneratorClass = TeamsTemplateGenerator
    ModelClass = Location

    def setUp(self):
        super().setUp()

        #generate five locations
        generate_locations(5)

    def test_export_locations_in_league_template(self):
        for row_data in self.template_generator.next_row():
            location = self.get_row_instance(row_data, "location_id")
            assert_row = self.get_assert_row_partial(row_data, location)

            assert_row("location_id","id")
            assert_row("location_name","name")
            assert_row("location_address","address")


class DataImportImporterTestCase(APITestCase):
    """
    test the importing of prevalidated data for Data Imports
    """
    pass


class DataImportImportValidationTestCase(APITestCase):
    """
    test the validation of the CSV to be imported in Data Imports
    """
    pass