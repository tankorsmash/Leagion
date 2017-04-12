from rest_framework import generics
from django.contrib.auth import get_user_model

from leagion.api.serializers.rosters import RosterSerializer
from leagion.models import Roster

from leagion.utils import reverse_js

User = get_user_model()


@reverse_js
class RosterList(generics.ListCreateAPIView):
    queryset = Roster.objects.all()
    serializer_class = RosterSerializer


@reverse_js
class RosterDetail(generics.RetrieveUpdateAPIView):
    lookup_url_kwarg = "roster_id"

    queryset = Roster.objects.all()
    serializer_class = RosterSerializer
