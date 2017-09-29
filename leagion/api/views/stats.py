from rest_framework.views import APIView
from rest_framework.response import Response

from django.contrib.auth import get_user_model
from django.db.models import Q

from leagion.models import League, Season, Match, Team, Roster

from leagion.utils import reverse_js
from leagion.api.filters import filter_queryset_to_commissioner

User = get_user_model()



@reverse_js
class StatsIndex(APIView):
    def get(self, request, format=None):
        #TODO limit by permissions

        user = request.user
        leagues = filter_queryset_to_commissioner(user, League.objects.all()).count()
        seasons = filter_queryset_to_commissioner(user, Season.objects.all()).count()
        matches = filter_queryset_to_commissioner(user, Match.objects.all()).count()
        teams = filter_queryset_to_commissioner(user, Team.objects.all()).count()
        rosters = filter_queryset_to_commissioner(user, Roster.objects.all()).count()
        players = filter_queryset_to_commissioner(user, User.objects.all()).count()

        result = {
            "league_count": leagues,
            "season_count": seasons,
            "match_count": matches,
            "team_count": teams,
            "roster_count": rosters,
            "player_count": players,
        }
        return Response(result)
