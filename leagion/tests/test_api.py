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

    def setup_client(self, user):
        self.client = APIClient()
        self.client.login(email=user.email, password=user.password)
        #dunno why this doesnt work
        # token = Token.objects.get(user=user)
        # client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)
        self.client.force_authenticate(user=user)

    def create_player(self):
        return User.objects.create(
            first_name="test",
            last_name="user2",
            password="abcd1234"
        )

    def get_url(self, url_name, url_args=None, url_kwargs=None, data=None):
        url = reverse(url_name, args=url_args, kwargs=url_kwargs)
        return self.client.get(url, data=data, format="json")



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

        self.setup_client(self.superuser)

    def assert_api_list(self, url, empty):
        response = self.get_url(url)
        if empty:
            self.assertEquals(len(response.json()), 0)
        else:
            self.assertNotEquals(len(response.json()), 0)
        return response

    def test_league_list(self):
        self.create_league()

        response = self.get_url("api-league-list")
        self.assertEquals(len(response.json()), 1)

        self.create_league()
        response = self.get_url("api-league-list")
        self.assertEquals(len(response.json()), 2)

    def test_commissioner_limits(self):
        """
        add a commissioner without leagues, make sure he can't see anything
        add a commissioner with league, make sure he can only see the league
        """

        league = self.create_league()
        season = self.create_season(league)
        team = self.create_team(season)

        lc = self.create_player()
        lc.is_commissioner = True
        lc.save()

        #create other league/team/season that isn't associated with the LC
        self.create_team(self.create_season(self.create_league()))


        self.setup_client(lc)

        #make sure no leagues
        self.assert_api_list("api-league-list", empty=True)
        self.assert_api_list("api-team-list", empty=True)
        response = self.get_url("api-league-detail", url_kwargs={"league_id": league.id})
        self.assertEquals(response.status_code, 404)
        response = self.get_url("api-team-detail", url_kwargs={"team_id": team.id})
        self.assertEquals(response.status_code, 404)

        #make sure only the one league after adding
        lc.leagues_commissioned.add(league)
        self.assert_api_list("api-league-list", empty=False)
        self.assert_api_list("api-team-list", empty=False)
        response = self.get_url("api-league-detail", url_kwargs={"league_id": league.id})
        self.assertEquals(response.status_code, 200)
        response = self.get_url("api-team-detail", url_kwargs={"team_id": team.id})
        self.assertEquals(response.status_code, 200)

        #make sure no league after removing
        lc.leagues_commissioned.remove(league)
        self.assert_api_list("api-league-list", empty=True)
        self.assert_api_list("api-team-list", empty=True)
        response = self.get_url("api-league-detail", url_kwargs={"league_id": league.id})
        self.assertEquals(response.status_code, 404)
        response = self.get_url("api-team-detail", url_kwargs={"team_id": team.id})
        self.assertEquals(response.status_code, 404)


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
