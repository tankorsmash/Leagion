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
from leagion.data_imports.template_generation import TeamsTemplateGenerator


class BaseDataExporter(APITestCase, CreatorMixin):
    """
    test the creation of the CSV template for Data Imports
    """
    # def test_build_empty_csv(self):
    #     tempgen = BaseTemplateGenerator()
    #     self.assertIsInstance()


class TeamExporterTestCase(BaseDataExporter):
    def test_export_teams_in_league_template(self):
        team_gen = TeamsTemplateGenerator()

        league = self.create_league()
        season = self.create_season(league)
        team = self.create_team(season)

        pass


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
