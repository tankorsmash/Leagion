from rest_framework.views import APIView
from rest_framework.response import Response

from django.contrib.auth import get_user_model
from django.db.models import Q

from leagion.models import League, Season, Match, Team, Roster

from leagion.utils import reverse_js

User = get_user_model()



@reverse_js
class StatsIndex(APIView):
    def get(self, request, format=None):
        #TODO limit by permissions

        user = request.user
        result = {
        }
        return Response(result)
