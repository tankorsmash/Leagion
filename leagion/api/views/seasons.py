from rest_framework import generics
from rest_framework import permissions
from django.contrib.auth import get_user_model

from leagion.api import serializers
from leagion.models import Match, Roster, Team, Season

from leagion.utils import reverse_js

User = get_user_model()


@reverse_js
class SeasonList(generics.ListCreateAPIView):
    queryset = Season.objects.all()
    serializer_class = serializers.SeasonSerializer


@reverse_js
class SeasonDetail(generics.RetrieveUpdateAPIView):
    lookup_url_kwarg = "season_id"

    queryset = Season.objects.all()
    serializer_class = serializers.SeasonSerializer

@reverse_js
class MySeasonList(SeasonList):
    serializer_class = serializers.MySeasonSerializer

    def get_queryset(self):
        user = self.request.user
        return Season.objects.filter(teams__players=user).distinct()

@reverse_js
class MySeasonDetail(SeasonDetail):
    def get_queryset(self):
        user = self.request.user
        return Season.objects.filter(teams__players=user).distinct()
