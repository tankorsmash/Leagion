from rest_framework import generics
from django.contrib.auth import get_user_model

from leagion.api.serializers.seasons import SeasonSerializer, MySeasonSerializer
from leagion.models import Season

from leagion.utils import reverse_js

User = get_user_model()


@reverse_js
class MyCommSeasonList(generics.ListCreateAPIView):
    serializer_class = SeasonSerializer

    def get_queryset(self):
        league_ids = self.request.user.leagues_commissioned.values_list('id', flat=True)
        return Season.objects.filter(
            league_id__in=league_ids
        ).distinct().select_related(
            "league",
        ).prefetch_related(
            "teams", "matches",

            "matches__home_team",
            "matches__location",
            "matches__away_team",
        )


@reverse_js
class MyCommSeasonDetail(generics.RetrieveUpdateAPIView):
    lookup_url_kwarg = "season_id"
    serializer_class = SeasonSerializer

    def get_queryset(self):
        league_ids = self.request.user.leagues_commissioned.values_list('id', flat=True)
        return Season.objects.filter(
            league_id__in=league_ids
        ).distinct()


@reverse_js
class MySeasonList(MyCommSeasonList):
    serializer_class = MySeasonSerializer

    def get_queryset(self):
        user = self.request.user
        return Season.objects.filter(teams__players=user).distinct()


@reverse_js
class MySeasonDetail(MyCommSeasonDetail):
    def get_queryset(self):
        user = self.request.user
        return Season.objects.filter(teams__players=user).distinct()
