from rest_framework.views import APIView
from rest_framework.response import Response
from leagion.utils import reverse_js
from leagion.models import Team


@reverse_js
class SiteConstants(APIView):
    def get(self, request, format=None):
        return Response({
            'teamColors': dict(Team.COLOR_CHOICES),
        })
