from django.test import TestCase
from django.contrib.auth import get_user_model
from django.core.urlresolvers import reverse

from rest_framework.test import APIRequestFactory, APITestCase, force_authenticate

from leagion.models import League
User = get_user_model()

from leagion.api import views as api_views

class ApiTest(APITestCase):
    urls = "leagion_server.urls"

    def setUp(self):
        self.user = User.objects.create_superuser(
            email="super@user.com",
            password="abcd1234"
        )

    def test_basic(self):
        League.objects.create(
            name="Test League",
        )

        factory = APIRequestFactory()
        request = factory.get(reverse("api-league-list"), format="json")

        force_authenticate(request, self.user)

        response = api_views.leagues.LeagueList.as_view()(request)
        self.assertEquals(response.data[0]['id'], 1)
