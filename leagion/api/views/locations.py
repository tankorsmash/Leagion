from rest_framework import generics
from django.contrib.auth import get_user_model

from leagion.api.serializers.locations import LocationSerializer

from leagion.models import Location

from leagion.utils import reverse_js
from .utils import DeleteManyViewMixin

@reverse_js
class MyCommLocationList(DeleteManyViewMixin, generics.ListCreateAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
    filter_fields = ('league',)
    search_fields = ('name', 'address')


@reverse_js
class MyCommLocationDetail(generics.RetrieveUpdateDestroyAPIView):
    lookup_url_kwarg = "location_id"

    queryset = Location.objects.all()
    serializer_class = LocationSerializer
