import datetime

from django.test import TestCase, override_settings
from django.contrib.auth import get_user_model
from django.core.urlresolvers import reverse

from rest_framework import status
from rest_framework.test import APIRequestFactory, APITestCase, force_authenticate

from leagion.models import League, Season, Team
User = get_user_model()

from leagion.api import views as api_views

@override_settings(ROOT_URLCONF="leagion_server.urls")
class ApiTest(APITestCase):
    """
    simple cases for now, but once we get permissions going, we'll use this
    to make sure a given user can't see too much from the api
    """

    def setUp(self):
        self.superuser = User.objects.create_superuser(
            email="super@user.com",
            password="abcd1234"
        )

    def test_basic(self):
        League.objects.create(
            name="Test League",
        )
        # url = reverse('api-league-list')
        # response = self.client.get(url, format='json')

        factory = APIRequestFactory()
        request = factory.get(reverse("api-league-list"), format="json")

        force_authenticate(request, self.superuser)

        response = api_views.leagues.LeagueList.as_view()(request)
        self.assertEquals(response.data[0]['id'], 1)

    def test_stats(self):
        league = League.objects.create(
            name="Test League",
        )

        season = Season.objects.create(
            league=league,
            start_date = datetime.datetime.now(),
            end_date = datetime.datetime.now(),
        )

        team = Team.objects.create(
            name="test team",
            season=season
        )

        player = User.objects.create(
            first_name="test",
            last_name="user2",
            password="abcd1234"
        )
        team.players.add(player, self.superuser)

        factory = APIRequestFactory()
        request = factory.get(reverse("api-stats-index"), format="json")

        force_authenticate(request, self.superuser)

        response = api_views.stats.StatsIndex.as_view()(request)
        stats = response.data
        self.assertEquals(stats['league_count'], 1)
        self.assertEquals(stats['season_count'], 1)
        self.assertEquals(stats['team_count'], 1)
        self.assertEquals(stats['player_count'], 2)
        #TODO rosters
