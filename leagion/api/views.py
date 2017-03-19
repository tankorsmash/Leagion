from django.contrib.auth.models import User

from rest_framework import generics
from rest_framework.permissions import IsAdminUser

from leagion.api.serializers import UserSerializer

class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserDetail(generics.RetrieveUpdateAPIView):
    lookup_url_kwarg = "player_id"

    queryset = User.objects.all()
    serializer_class = UserSerializer
