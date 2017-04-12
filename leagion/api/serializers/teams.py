from django.db.models import Q

from rest_framework import serializers
from leagion.models import Team, Match
from leagion.api.serializers.users import UserSerializer
from leagion.api.serializers.matches import MatchSerializer

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = (
            'id', 'name', 'players', 'season', 'matches'
        )

    matches = serializers.SerializerMethodField('get_ordered_matches')
    players = UserSerializer(many=True)

    def get_ordered_matches(self, obj):
        matches = Match.objects.filter(
            Q(home_team=obj) |
            Q(away_team=obj)
        ).order_by('match_datetime')

        serializer = MatchSerializer(matches, many=True)
        return serializer.data
