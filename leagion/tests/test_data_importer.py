import time
import csv
import datetime

from django.test import TestCase, override_settings
from django.contrib.auth import get_user_model
from django.core.urlresolvers import reverse

from rest_framework import status
from rest_framework.test import APIRequestFactory, APITestCase, force_authenticate, APIClient
from rest_framework.authtoken.models import Token

from leagion.models import League, Season, Team
User = get_user_model()

from leagion.tests.test_api import CreatorMixin #TODO move this out of there
from leagion.data_imports.template_generation import TeamsTemplateGenerator, ColumnData


class BaseDataExporter(APITestCase, CreatorMixin):
    """
    test the creation of the CSV template for Data Imports
    """


class TeamExporterTestCase(BaseDataExporter):
    def setUp(self):
        self.team_gen = TeamsTemplateGenerator()

        self.league = self.create_league()
        self.season = self.create_season(self.league)
        self.teams = []
        for _ in range(5):
            self.teams.append(self.create_team(self.season))

    def test_export_teams_in_league_template(self):
        #assert all teams' ids show up
        for row_data in self.team_gen.next_row():
            team_id = row_data.team_id
            team = Team.objects.get(id=row_data.team_id.data)
            self.assertEquals(row_data.team_id.data, team.id)


class LocationsExporterTestCase(BaseDataExporter):
    def test_export_locations_in_league_template(self):
        pass


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
