from rest_framework import serializers
from leagion.models import Match, Team


class ShallowTeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = (
            'id', 'name', 'season'
        )

class MatchSerializer(serializers.ModelSerializer):
    home_team = ShallowTeamSerializer(read_only=True)
    away_team = ShallowTeamSerializer(read_only=True)

    class Meta:
        model = Match

        fields = (
            'id', 'match_datetime', 'location', 'season', 'duration_seconds',
            'home', 'home_points', 'away_team', 'away_points', 'status',
            'postponed_to', 'postponed_from', 'pretty_name', 'pretty_date',
            'pretty_time'
        )
