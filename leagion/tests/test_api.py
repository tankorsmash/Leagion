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

from leagion.api import views as api_views

class BaseAPITestCase(APITestCase):
    def create_league(self, league_name=None):
        if league_name is None:
            #uses time to make sure the default name isnt repeated
            league_name = "Test League " + time.ctime()

        return League.objects.create(
            name=league_name,
        )

    def create_season(self, league):
        return Season.objects.create(
            league=league,
            start_date = datetime.datetime.now(),
            end_date = datetime.datetime.now()+datetime.timedelta(hours=1),
        )

    def create_team(self, season):
        return Team.objects.create(
            name="Test Team" + time.ctime(),
            season=season
        )

    def create_player(self):
        return User.objects.create(
            first_name="test",
            last_name="user2",
            password="abcd1234"
        )



@override_settings(ROOT_URLCONF="leagion_server.urls")
class ApiTest(BaseAPITestCase):
    """
    simple cases for now, but once we get permissions going, we'll use this
    to make sure a given user can't see too much from the api
    """

    def setUp(self):
        self.superuser = User.objects.create_superuser(
            email="super@user.com",
            password="abcd1234"
        )

        self.client = APIClient()
        self.client.login(email=self.superuser.email, password=self.superuser.password)
        #dunno why this doesnt work
        # token = Token.objects.get(user=self.superuser)
        # client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)
        self.client.force_authenticate(user=self.superuser)

    def test_league_list(self):
        self.create_league()

        response = self.client.get(reverse("api-league-list"), format="json")
        self.assertEquals(len(response.json()), 1)

        self.create_league()
        response = self.client.get(reverse("api-league-list"), format="json")
        self.assertEquals(len(response.json()), 2)


    def test_stats(self):
        league = self.create_league()

        season = self.create_season(league)
        team = self.create_team(season)

        player = self.create_player()
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
