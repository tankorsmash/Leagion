from django.db.models import Q

from rest_framework import serializers
from leagion.models import Team, Match, League, Season
from leagion.api.serializers.users import UserSerializer
from leagion.api.serializers.matches import MatchSerializer


class ShallowLeagueSerializer(serializers.ModelSerializer):
    class Meta:
        model = League
        fields = (
            'id', 'name'
        )

class ShallowSeasonSerializer(serializers.ModelSerializer):
    league = ShallowLeagueSerializer(read_only=True)

    class Meta:
        model = Season
        fields = (
            'id', 'pretty_date', 'league'
        )

class ShallowMatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Match

        fields = (
            'id', 'match_datetime', 'location', 'season', 'duration_seconds',
            'home_team', 'home_points', 'away_team', 'away_points', 'status',
            'postponed_to', 'postponed_from', 'pretty_name', 'pretty_date',
            'pretty_time', 'home_roster', 'away_roster'
        )

class TeamSerializer(serializers.ModelSerializer):
    matches = serializers.SerializerMethodField('get_ordered_matches')
    players = UserSerializer(many=True)
    season = ShallowSeasonSerializer(read_only=True)

    class Meta:
        model = Team
        fields = (
            'id', 'name', 'players', 'season', 'matches'
        )

    def get_ordered_matches(self, obj):
        matches = Match.objects.filter(
            Q(home_team=obj) |
            Q(away_team=obj)
        ).order_by('match_datetime').select_related(
            "home_team", "home_roster",
            "away_team", "away_roster",
            "location", "season"
        )

        serializer = ShallowMatchSerializer(matches, many=True)
        return serializer.data
