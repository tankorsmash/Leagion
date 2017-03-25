from leagion.models import User

from rest_framework import generics
from rest_framework.permissions import IsAdminUser
from rest_framework.authentication import BasicAuthentication

from leagion.api import serializers
from leagion.models import Match, Roster, Team, League

from leagion.utils import reverse_js

from knox.views import LoginView as KnoxLoginView, LogoutView as KnoxLogoutView, \
    LogoutAllView as KnoxLogoutAllView

@reverse_js
class LoginView(KnoxLoginView):
    authentication_classes = [BasicAuthentication]

@reverse_js
class LogoutView(KnoxLogoutView):
    pass

@reverse_js
class LogoutAllView(KnoxLogoutAllView):
    pass

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
