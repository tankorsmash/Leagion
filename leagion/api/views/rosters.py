from rest_framework import generics
from rest_framework.response import Response
from django.contrib.auth import get_user_model

from leagion.api.serializers.rosters import RosterSerializer
from leagion.models import Roster

from leagion.utils import reverse_js

from leagion.models.utils.roster import get_or_create_roster

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

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        get_or_create_roster(instance, instance.team)
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
