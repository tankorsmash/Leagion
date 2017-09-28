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

        leagues = list(League.objects.all())
        seasons = list(Season.objects.all())
        matches = list(Match.objects.all())
        teams = list(Team.objects.all())
        rosters = list(Roster.objects.all())
        players = list(User.objects.all())

        result = {
            "league_count": len(leagues),
            "season_count": len(seasons),
            "match_count": len(matches),
            "team_count": len(teams),
            "roster_count": len(rosters),
            "player_count": len(players),
        }
        return Response(result)
