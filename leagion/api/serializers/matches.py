from rest_framework import serializers
from leagion.models import Match, Team
from leagion.api.serializers.rosters import RosterSerializer


class ShallowTeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = (
            'id', 'name', 'season'
        )

class ShallowLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = (
            'id', 'name'
        )

class MatchSerializer(serializers.ModelSerializer):
    home_team = ShallowTeamSerializer(read_only=True)
    away_team = ShallowTeamSerializer(read_only=True)
    location = ShallowLocationSerializer(read_only=True)
    home_roster = RosterSerializer(read_only=True)
    away_roster = RosterSerializer(read_only=True)

    class Meta:
        model = Match

        fields = (
            'id', 'match_datetime', 'location', 'season', 'duration_seconds',
            'home_team', 'home_points', 'away_team', 'away_points', 'status',
            'postponed_to', 'postponed_from', 'pretty_name', 'pretty_date',
            'pretty_time', 'home_roster', 'away_roster'
        )
