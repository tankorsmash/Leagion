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
            'home_team', 'home_points', 'away_team', 'away_points', 'status',
            'postponed_to', 'postponed_from', 'pretty_name', 'pretty_date',
            'pretty_time', 'home_roster', 'away_roster'
        )

    home_team = ShallowTeamSerializer(read_only=True)
    away_team = ShallowTeamSerializer(read_only=True)
    location = ShallowLocationSerializer(read_only=True)

    #TODO fix app/match.jsx to either use this OR move BattingOrderTable to DatasetView
    # and use a specific api-roster-detail. The non shallow serializer is too heavy
    # home_roster = RosterSerializer(read_only=True)
    # away_roster = RosterSerializer(read_only=True)

