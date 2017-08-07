from rest_framework import generics
from django.contrib.auth import get_user_model
from leagion.models import Season

from leagion.api.serializers.users import UserSerializer, PublicUserSerializer

from leagion.utils import reverse_js

User = get_user_model()


@reverse_js
class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all().prefetch_related(
        "teams"
    )
    serializer_class = UserSerializer


@reverse_js
class UserDetail(generics.RetrieveUpdateAPIView):
    lookup_url_kwarg = "player_id"

    queryset = User.objects.all().prefetch_related(
        "teams"
    )
    serializer_class = UserSerializer


@reverse_js
class MyUserDetailsView(generics.RetrieveUpdateAPIView):
    """ GET, PUT, and PATCH current users details """
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

    def get_queryset(self):
        return get_user_model().objects.none()

@reverse_js
class PublicPlayerView(generics.RetrieveAPIView):
    """ get public info for users the current user can see """
    serializer_class = PublicUserSerializer
    lookup_url_kwarg = "player_id"

    def get_queryset(self):
        teams = self.request.user.teams.all()
        seasons = Season.objects.filter(teams__in=teams).distinct()
        return User.objects.filter(teams__season__in=seasons).distinct()
