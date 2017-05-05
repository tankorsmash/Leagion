from rest_framework import generics
from django.contrib.auth import get_user_model

from leagion.api.serializers.teams import TeamSerializer
from leagion.models import Team

from leagion.utils import reverse_js

User = get_user_model()


@reverse_js
class TeamList(generics.ListCreateAPIView):
    queryset = Team.objects.all().prefetch_related(
        "home_matches__home_team", "home_matches__home_roster",
        "home_matches__away_team", "home_matches__away_roster",
        "home_matches__location", "home_matches__season",

        "away_matches__home_team", "away_matches__home_roster",
        "away_matches__away_team", "away_matches__away_roster",
        "away_matches__location", "away_matches__season",

        "players"
    ).select_related(
        "season", "season__league",
    )
    serializer_class = TeamSerializer


@reverse_js
class TeamDetail(generics.RetrieveUpdateAPIView):
    lookup_url_kwarg = "team_id"

    queryset = Team.objects.all()
    serializer_class = TeamSerializer


@reverse_js
class MyTeamList(TeamList):

    def get_queryset(self):
        user = self.request.user
        return Team.objects.filter(players=user)
