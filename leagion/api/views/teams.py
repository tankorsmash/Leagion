from rest_framework import generics
from rest_framework import permissions
from django.contrib.auth import get_user_model

from leagion.api import serializers
from leagion.models import Match, Roster, Team, League

from leagion.utils import reverse_js

User = get_user_model()


@reverse_js
class TeamList(generics.ListCreateAPIView):
    queryset = Team.objects.all()
    serializer_class = serializers.TeamSerializer


@reverse_js
class TeamDetail(generics.RetrieveUpdateAPIView):
    lookup_url_kwarg = "team_id"

    queryset = Team.objects.all()
    serializer_class = serializers.TeamSerializer
