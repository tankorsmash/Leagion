from rest_framework import serializers
from leagion.models import Match, Team, Location
from leagion.api.serializers.rosters import RosterSerializer


class ShallowTeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = (
            'id', 'name', 'season'
        )

class ShallowLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = (
            'id', 'name'
        )

class MatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Match

        fields = (
            'id', 'match_datetime', 'location', 'season', 'duration_seconds',
            'home_team', 'home_team_id', 'home_points', 'home_roster',
            'away_team', 'away_team_id', 'away_points', 'away_roster',
            'status', 'completed', 'postponed_to', 'postponed_from',
            'pretty_name', 'pretty_date', 'pretty_time',
        )

    home_team = ShallowTeamSerializer(read_only=True)
    home_team_id = serializers.IntegerField(required=False)
    away_team = ShallowTeamSerializer(read_only=True)
    location = ShallowLocationSerializer(read_only=True)
    away_team_id = serializers.IntegerField(required=False)

    postponed_to = serializers.IntegerField(required=False, allow_null=True, default=None)
    postponed_from = serializers.IntegerField(read_only=True)
    #TODO fix app/match.jsx to either use this OR move BattingOrderTable to DatasetView
    # and use a specific api-roster-detail. The non shallow serializer is too heavy
    # home_roster = RosterSerializer(read_only=True)
    # away_roster = RosterSerializer(read_only=True)

class SetMatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Match

        fields = (
            'home_points', 'away_points',
        )
