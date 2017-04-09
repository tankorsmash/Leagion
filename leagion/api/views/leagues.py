from rest_framework import generics
from rest_framework import permissions
from django.contrib.auth import get_user_model

from leagion.api import serializers
from leagion.models import Match, Roster, Team, League, Season

from leagion.utils import reverse_js

User = get_user_model()


@reverse_js
class LeagueList(generics.ListCreateAPIView):
    queryset = League.objects.all()
    serializer_class = serializers.LeagueSerializer


@reverse_js
class LeagueDetail(generics.RetrieveUpdateAPIView):
    lookup_url_kwarg = "league_id"

    queryset = League.objects.all()
    serializer_class = serializers.LeagueSerializer

@reverse_js
class MyLeagueList(LeagueList):
    serializer_class = serializers.MyLeagueSerializer

    def get_queryset(self):
        user = self.request.user
        return League.objects.filter(seasons__teams__players=user).distinct()

@reverse_js
class MyLeagueDetail(LeagueDetail):
    serializer_class = serializers.MyLeagueSerializer

    def get_queryset(self):
        user = self.request.user
        return League.objects.filter(seasons__teams__players=user).distinct()
