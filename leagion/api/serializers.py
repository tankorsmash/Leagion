from django.conf.urls import url, include
from leagion.models import User
from rest_framework import routers, serializers, viewsets

from leagion.models import Match, Roster, Team, League

# Serializers define the API representation.
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name',)


class MatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Match
        fields = (
            'id', 'match_datetime', 'location', 'league', 'duration_seconds',
            'away_team', 'away_points','away_team', 'away_points', 'status',
            'postponed_to', 'postponed_from', 'pretty_name',
        )
