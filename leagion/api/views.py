from django.contrib.auth.models import User

from rest_framework import generics
from rest_framework.permissions import IsAdminUser

from leagion.api import serializers
from leagion.models import Match, Roster, Team, League

from leagion.utils import reverse_js

@reverse_js
class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer

@reverse_js
class UserDetail(generics.RetrieveUpdateAPIView):
    lookup_url_kwarg = "player_id"

    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer

@reverse_js
class MatchList(generics.ListCreateAPIView):
    queryset = Match.objects.all()
    serializer_class = serializers.MatchSerializer

@reverse_js
class MatchDetail(generics.RetrieveUpdateAPIView):
    lookup_url_kwarg = "match_id"

    queryset = Match.objects.all()
    serializer_class = serializers.MatchSerializer
