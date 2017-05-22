from rest_framework import generics
from django.contrib.auth import get_user_model

from leagion.api.serializers.users import UserSerializer

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
class UserDetailsView(generics.RetrieveUpdateAPIView):
    """ GET, PUT, and PATCH current users details """
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

    def get_queryset(self):
        return get_user_model().objects.none()
