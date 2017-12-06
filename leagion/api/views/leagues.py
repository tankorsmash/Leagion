from django.contrib.auth import get_user_model

from rest_framework import generics, filters

from leagion.api.serializers.leagues import LeagueSerializer, MyLeagueSerializer
from leagion.api.serializers.seasons import SeasonSerializer
from leagion.models import League, Season

from leagion.utils import reverse_js

User = get_user_model()


@reverse_js
class MyCommLeagueList(generics.ListCreateAPIView):
    serializer_class = LeagueSerializer

    def get_queryset(self):
        return self.request.user.leagues_commissioned.all()


@reverse_js
class MyCommLeagueDetail(generics.RetrieveUpdateAPIView):
    lookup_url_kwarg = "league_id"
    serializer_class = LeagueSerializer

    def get_queryset(self):
        return self.request.user.leagues_commissioned.all()


@reverse_js
class MyLeagueList(MyCommLeagueList):
    serializer_class = MyLeagueSerializer

    def get_queryset(self):
        user = self.request.user
        return League.objects.filter(seasons__teams__players=user).distinct()


@reverse_js
class MyLeagueDetail(MyCommLeagueDetail):
    serializer_class = MyLeagueSerializer

    def get_queryset(self):
        user = self.request.user
        return League.objects.filter(seasons__teams__players=user).distinct()
