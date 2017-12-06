from rest_framework import permissions
from rest_framework import generics

from django.contrib.auth import get_user_model

from leagion.api.serializers.matches import MatchSerializer, SetMatchSerializer
from leagion.models import Match

from leagion.utils import reverse_js
from leagion.api.utils import match_queryset_as_player

User = get_user_model()


@reverse_js
class MyCommMatchList(generics.ListCreateAPIView):
    serializer_class = MatchSerializer

    def get_queryset(self):
        league_ids = self.request.user.leagues_commissioned.values_list('id', flat=True)
        return Match.objects.filter(
            season__league_id__in=league_ids
        ).distinct().select_related(
            "season", "location",
            'away_team', 'away_roster__team',
            'away_team__season',
            'away_team__name',

            'home_team', 'home_roster__team',
            'home_team__season',
            'home_team__name',

            'postponed_to',
        ).prefetch_related(
            'postponed_to', 'postponed_from',
            'location',
            'away_team', 'away_roster', 'away_roster__team',
            'away_team__season',

            'home_team', 'home_roster','home_roster__team',
            'home_team__season',
        )


@reverse_js
class MyCommMatchDetail(generics.RetrieveUpdateAPIView):
    lookup_url_kwarg = "match_id"
    serializer_class = MatchSerializer

    def get_queryset(self):
        league_ids = self.request.user.leagues_commissioned.values_list('id', flat=True)
        return Match.objects.filter(
            season__league_id__in=league_ids
        ) .distinct()


class SetMatchPermission(permissions.BasePermission):
    message = 'You do not have the authority to update the score of this match'

    def has_object_permission(self, request, view, match):
        teams = request.user.captain_of_teams.values_list('id', flat=True)

        if match.home_team.id in teams or match.away_team.id in teams:
            return True
        else:
            return False


@reverse_js
class SetMatchScore(generics.RetrieveUpdateAPIView):
    lookup_url_kwarg = "match_id"
    serializer_class = MatchSerializer
    permission_classes = (SetMatchPermission,)
    serializer_class = SetMatchSerializer
    queryset = Match.objects.all()


@reverse_js
class MyMatchList(generics.ListCreateAPIView):
    serializer_class = MatchSerializer

    def get_queryset(self):
        return match_queryset_as_player(self.request.user)


@reverse_js
class MyMatchDetail(generics.RetrieveUpdateAPIView):
    lookup_url_kwarg = "match_id"
    serializer_class = MatchSerializer

    def get_queryset(self):
        return match_queryset_as_player(self.request.user)
