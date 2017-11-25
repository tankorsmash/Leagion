from django.http import Http404
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model

from rest_framework.response import Response
from rest_framework import generics, serializers, views as drf_views, filters

from leagion.api.serializers.users import UserSerializer
from leagion.api.serializers.teams import TeamSerializer, PureTeamSerializer, CreateTeamSerializer
from leagion.models import Team, User

from leagion.utils import reverse_js


@reverse_js
class TeamList(generics.ListCreateAPIView):
    queryset = Team.objects.all().prefetch_related(
        "home_matches", "away_matches", "players"
    ).select_related(
        "season"
    )
    serializer_class = TeamSerializer
    filter_fields = ('season',)

    def get_serializer_class(self):
        if self.request.method == "POST":
            return CreateTeamSerializer

        return super().get_serializer_class()


@reverse_js
class TeamDetail(generics.RetrieveUpdateAPIView):
    lookup_url_kwarg = "team_id"

    queryset = Team.objects.all().prefetch_related(
        "home_matches__home_team", "home_matches__home_roster",
        "home_matches__away_team", "home_matches__away_roster",
        "home_matches__location", "home_matches__season",
        "home_matches__postponed_to", "home_matches__postponed_from",

        "away_matches__home_team", "away_matches__home_roster",
        "away_matches__away_team", "away_matches__away_roster",
        "away_matches__location", "away_matches__season",
        "away_matches__postponed_to","away_matches__postponed_from",

        "players"
    ).select_related(
        "season", "season__league",
    )
    serializer_class = TeamSerializer


@reverse_js
class AddPlayersToTeam(drf_views.APIView):
    lookup_url_kwarg = "team_id"

    queryset = Team.objects.all()

    def patch(self, request, team_id=None):
        team = get_object_or_404(self.queryset, id=team_id)

        #validate player ids
        player_ids = request.data.get('player_ids')
        if not player_ids:
            raise Http404("Missing player ids")

        try:
            player_ids = list(map(lambda pid: int(pid), player_ids))
        except ValueError:
            raise Http404("Invalid player ids. Numbers only")

        old_count = team.players.count()
        team.players.add(*player_ids)
        new_count = team.players.count()

        return Response("Success! Added {} new players".format(new_count-old_count))


@reverse_js
class RemovePlayersFromTeam(drf_views.APIView):
    lookup_url_kwarg = "team_id"

    queryset = Team.objects.all()

    def patch(self, request, team_id=None):
        team = get_object_or_404(self.queryset, id=team_id)

        #validate player ids
        player_ids = request.data.get('player_ids')
        if not player_ids:
            raise Http404("Missing player ids")

        try:
            player_ids = list(map(lambda pid: int(pid), player_ids))
        except ValueError:
            raise Http404("Invalid player ids. Numbers only")

        old_count = team.players.count()
        team.players.remove(*player_ids)
        new_count = team.players.count()

        return Response("Success! Added {} new players".format(new_count-old_count))


@reverse_js
class MyTeamList(generics.ListCreateAPIView):
    serializer_class = TeamSerializer

    def get_queryset(self):
        user = self.request.user
        return Team.objects.filter(players=user)
