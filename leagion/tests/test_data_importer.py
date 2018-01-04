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
from leagion.data_imports.import_validation import (
    date_validator, time_validator, whole_number_validator,

    is_row_well_formatted, get_invalid_rows
)

from leagion.utils import generate_locations

NO_DATA = 0xDEADBEEF

def column_order_checker(self):
    """
    added to TestCases below via metaclass

    checks to make sure columns are output in order

    NOTE: avoiding using 'test' in the name so it doesn't get picked up by
    unittest until after it's been assigned
    """

    instance = self.ModelClass.objects.first()

    #check row data against column order
    row = self.template_generator.build_row(instance)
    self.assertEquals(
        [col.col_id for col in row],
        self.template_generator.column_order
    )

    #swap the column order, make sure the old one fails and the new rows matches
    self.template_generator.column_order = self.template_generator.column_order[::-1]
    old_row = row
    row = self.template_generator.build_row(instance)
    self.assertEquals(
        [col.col_id for col in row],
        self.template_generator.column_order
    )
    self.assertNotEquals(
        [col.col_id for col in old_row],
        self.template_generator.column_order
    )


class DataExporterScaffolding(type):
    """
    sets up a test for checking the column order of the subclassed TestCases

    This needs to be generated because you can't add them in __init__ and have
    unittest pick them up, and I don't want to copy and paste the test for each
    subclass (of which there is only two TBF)
    """
    def __new__(cls, name, bases, attrs):
        #skip BaseDataExporterTestCase
        if name != "BaseDataExporterTestCase":
            attrs["test_column_order"] = column_order_checker

        return super().__new__(cls, name, bases, attrs)


# TODO fix subclassing from APITestCase because not all of that is helpful

class BaseDataExporterTestCase(APITestCase, CreatorMixin, metaclass=DataExporterScaffolding):
    """
    test the creation of the CSV template for Data Imports
    """

    GeneratorClass = None #ie TeamsTemplateGenerator
    ModelClass = None #ie Team

    def setUp(self):
        self.template_generator = self.GeneratorClass()

    def tearDown(self):
        self.clear_lru_caches()

    def clear_lru_caches(self):
        #clear the LRU caches (not sure if necessary, but making sure)
        self.get_row_instance.cache_clear()
        self.get_assert_row_partial.cache_clear()


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


class TeamExporterTestCase(BaseDataExporterTestCase):
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



class LocationsExporterTestCase(BaseDataExporterTestCase):
    GeneratorClass = LocationTemplateGenerator
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

    def test_create_match(self):
        pass


class DataImportImportValidationTestCase(APITestCase):
    """
    test the validation of the CSV to be imported in Data Imports
    """

    def test_date_validator(self):
        self.assertFalse(date_validator(False))
        self.assertFalse(date_validator(123))
        self.assertFalse(date_validator(""))
        self.assertFalse(date_validator("31/2017/12"))
        self.assertFalse(date_validator("31/11/2017"))
        self.assertFalse(date_validator("11/31/2017"))

        #random dates
        self.assertTrue(date_validator("2017/01/01"))
        self.assertTrue(date_validator("2117/11/11"))
        self.assertTrue(date_validator("1989/10/10"))


    def test_time_validator(self):
        self.assertFalse(time_validator(False))
        self.assertFalse(time_validator(123))
        self.assertFalse(time_validator(""))
        self.assertFalse(time_validator("12:30 AM"))
        self.assertFalse(time_validator("12h30 PM"))
        self.assertFalse(time_validator("12h30"))
        self.assertFalse(time_validator("12:30 am"))
        self.assertFalse(time_validator("12:30 pm"))

        #random dates
        self.assertTrue(time_validator("01:30"))
        self.assertTrue(time_validator("21:45"))
        self.assertTrue(time_validator("00:00"))

    def test_whole_number_validator(self):
        self.assertFalse(whole_number_validator("asd"))
        self.assertFalse(whole_number_validator("123123asdasd"))
        self.assertFalse(whole_number_validator("123,23"))

        self.assertTrue(whole_number_validator("12323"))
        self.assertTrue(whole_number_validator(12323))
        self.assertTrue(whole_number_validator(0))
        self.assertTrue(whole_number_validator(-1))
        self.assertTrue(whole_number_validator("0"))

    def test_get_invalid_rows(self):
        VALID_DATE = "2017/01/12"
        VALID_TIME = "12:22"
        VALID_TEAM_ID = VALID_LOCATION_ID = VALID_NUM = 123

        rows = []

        #sanity
        row = [
            VALID_DATE, VALID_TIME, VALID_TEAM_ID, VALID_NUM,
            VALID_TEAM_ID, VALID_NUM, VALID_LOCATION_ID, VALID_NUM
        ]
        rows.append(row)
        is_well_formatted = is_row_well_formatted(row)
        self.assertTrue(is_well_formatted)

        #invalid date
        row = [
            "March 1st", VALID_TIME, VALID_TEAM_ID, VALID_NUM,
            VALID_TEAM_ID, VALID_NUM, VALID_LOCATION_ID, VALID_NUM
        ]
        rows.append(row)
        is_well_formatted = is_row_well_formatted(row)
        self.assertFalse(is_well_formatted[0])
        self.assertEqual(is_well_formatted[1], 0)

        #invalid time
        row = [
            VALID_DATE, "12h33", VALID_TEAM_ID, VALID_NUM,
            VALID_TEAM_ID, VALID_NUM, VALID_LOCATION_ID, VALID_NUM
        ]
        rows.append(row)
        is_well_formatted = is_row_well_formatted(row)
        self.assertFalse(is_well_formatted[0])
        self.assertEqual(is_well_formatted[1], 1)

        #invalid number (all other column types are numbers too, so we dont check)
        row = [
            VALID_DATE, VALID_TIME, "home team #3", VALID_NUM,
            VALID_TEAM_ID, VALID_NUM, VALID_LOCATION_ID, VALID_NUM
        ]
        rows.append(row)
        is_well_formatted = is_row_well_formatted(row)
        self.assertFalse(is_well_formatted[0])
        self.assertEqual(is_well_formatted[1], 2)

        #make sure the bad rows are marked
        invalid_rows = get_invalid_rows(rows)
        self.assertEquals(
            invalid_rows,
            [(1, 0), (2, 1), (3, 2)]
        )
