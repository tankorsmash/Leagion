import time
import datetime

from django.test import TestCase, override_settings
from django.contrib.auth import get_user_model
from django.core.urlresolvers import reverse

from rest_framework import status
from rest_framework.test import APIRequestFactory, APITestCase, force_authenticate, APIClient
from rest_framework.authtoken.models import Token

from leagion.models import League, Season, Team
User = get_user_model()




class DataImportImporterTestCase(BaseAPITestCase):
    """
    test the importing of prevalidated data for Data Imports
    """
    pass


class DataImportTemplateGenerationTestCase(BaseAPITestCase):
    """
    test the creation of the CSV template for Data Imports
    """
    pass


class DataImportImportValidationTestCase(BaseAPITestCase):
    """
    test the validation of the CSV to be imported in Data Imports
    """
    pass
