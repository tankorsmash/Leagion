from rest_framework import generics
from django.contrib.auth import get_user_model

from leagion.api.serializers.matches import MatchSerializer
from leagion.models import Match

from leagion.utils import reverse_js

User = get_user_model()


@reverse_js
class MatchList(generics.ListCreateAPIView):
    queryset = Match.objects.all().select_related(
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
        'away_team', 'away_roster',
        'away_team__season',

        'home_team', 'home_roster',
        'home_team__season',
    )

    serializer_class = MatchSerializer


@reverse_js
class MatchDetail(generics.RetrieveUpdateAPIView):
    lookup_url_kwarg = "match_id"

    queryset = Match.objects.all()
    serializer_class = MatchSerializer
