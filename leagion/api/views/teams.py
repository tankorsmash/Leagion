from rest_framework import generics
from django.contrib.auth import get_user_model

from leagion.api.serializers.teams import TeamSerializer
from leagion.models import Team

from leagion.utils import reverse_js

User = get_user_model()


@reverse_js
class TeamList(generics.ListCreateAPIView):
    queryset = Team.objects.all()
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
