from rest_framework import generics
from rest_framework import permissions
from rest_framework.authentication import BasicAuthentication
from django.contrib.auth import get_user_model

from leagion.api import serializers
from leagion.models import Match, Roster, Team, League

from leagion.utils import reverse_js

from knox.views import LoginView as KnoxLoginView, LogoutView as KnoxLogoutView, \
    LogoutAllView as KnoxLogoutAllView

from rest_framework.generics import CreateAPIView
from django.contrib.auth import get_user_model # If used custom user model

User = get_user_model()

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
class CreateUserView(CreateAPIView):
    authentication_classes = [BasicAuthentication]
    permission_classes = [permissions.AllowAny]
    serializer_class = serializers.UserSerializer
    model = User

@reverse_js
class MatchList(generics.ListCreateAPIView):
    queryset = Match.objects.all()
    serializer_class = serializers.MatchSerializer

@reverse_js
class MatchDetail(generics.RetrieveUpdateAPIView):
    lookup_url_kwarg = "match_id"

    queryset = Match.objects.all()
    serializer_class = serializers.MatchSerializer
