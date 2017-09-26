from django.contrib.auth import get_user_model

from rest_framework import generics, filters

from leagion.api.serializers.leagues import LeagueSerializer, MyLeagueSerializer
from leagion.api.serializers.seasons import SeasonSerializer
from leagion.models import League, Season

from leagion.utils import reverse_js

User = get_user_model()

class LeagueFilterBackend(filters.BaseFilterBackend):
    # class Meta:
    #     model = League

    def filter_queryset(self, request, league_qs, view):
        user = request.user
        if user.is_staff or user.is_moderator:
            return league_qs

        return league_qs.filter(league_commissioners=user)

@reverse_js
class LeagueList(generics.ListCreateAPIView):
    queryset = League.objects.all()
    serializer_class = LeagueSerializer
    filter_backends = (LeagueFilterBackend,)


@reverse_js
class LeagueSeasonsList(generics.ListCreateAPIView):
    """
    for getting a given League's Seasons
    """
    serializer_class = SeasonSerializer

    def get_queryset(self):
        league_id = self.kwargs['league_id']
        return Season.objects.filter(league_id=league_id).select_related(
            "league",
        ).prefetch_related(
            "teams", "matches",

            "matches__home_team",
            "matches__location",
            "matches__away_team",
        )

@reverse_js
class LeagueDetail(generics.RetrieveUpdateAPIView):
    lookup_url_kwarg = "league_id"

    queryset = League.objects.all()
    serializer_class = LeagueSerializer
    filter_backends = (LeagueFilterBackend,)


@reverse_js
class MyLeagueList(LeagueList):
    serializer_class = MyLeagueSerializer

    def get_queryset(self):
        user = self.request.user
        return League.objects.filter(seasons__teams__players=user).distinct()


@reverse_js
class MyLeagueDetail(LeagueDetail):
    serializer_class = MyLeagueSerializer

    def get_queryset(self):
        user = self.request.user
        return League.objects.filter(seasons__teams__players=user).distinct()
