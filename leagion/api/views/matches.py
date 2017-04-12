from rest_framework import generics
from django.contrib.auth import get_user_model

from leagion.api.serializers.matches import MatchSerializer
from leagion.models import Match

from leagion.utils import reverse_js

User = get_user_model()


@reverse_js
class MatchList(generics.ListCreateAPIView):
    queryset = Match.objects.all()
    serializer_class = MatchSerializer


@reverse_js
class MatchDetail(generics.RetrieveUpdateAPIView):
    lookup_url_kwarg = "match_id"

    queryset = Match.objects.all()
    serializer_class = MatchSerializer
