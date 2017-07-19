from rest_framework import generics
from django.contrib.auth import get_user_model

from leagion.api.serializers.locations import LocationSerializer

from leagion.models import Location

from leagion.utils import reverse_js

@reverse_js
class LocationList(generics.ListCreateAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer


@reverse_js
class LocationDetail(generics.RetrieveUpdateAPIView):
    lookup_url_kwarg = "location_id"

    queryset = Location.objects.all()
    serializer_class = LocationSerializer