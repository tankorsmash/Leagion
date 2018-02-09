from datetime import datetime
from rest_framework import serializers
from leagion.models import Match, Team, Location, Roster, Batter
from leagion.api.serializers.rosters import RosterSerializer
from leagion.api.validators import no_empty_date, no_empty_time


class ShallowTeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = (
            'id', 'name', 'season', 'logo_url', 'color_value'
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
            'id', 'location_id', 'location', 'season', 'duration_seconds',
            'home_team', 'home_team_id', 'home_points', 'home_roster',
            'away_team', 'away_team_id', 'away_points', 'away_roster',
            'status', 'completed', 'postponed_to', 'postponed_from',
            'pretty_name', 'pretty_date', 'pretty_time', 'date', 'time'
        )

    home_team = ShallowTeamSerializer(read_only=True)
    home_team_id = serializers.IntegerField(required=True)
    away_team = ShallowTeamSerializer(read_only=True)
    away_team_id = serializers.IntegerField(required=True)

    date = serializers.DateField(required=True, validators=[no_empty_date])
    time = serializers.TimeField(required=True, validators=[no_empty_time])

    location = ShallowLocationSerializer(read_only=True)
    location_id = serializers.IntegerField(required=False)

    postponed_to = serializers.IntegerField(required=False, allow_null=True, default=None)
    postponed_from = serializers.IntegerField(read_only=True)

    def validate(self, data):
        if (
            hasattr(data, 'home_team_id') and hasattr(data, 'away_team_id') and
            data['home_team_id'] == data['away_team_id']
        ):
            raise serializers.ValidationError(
                {'away_team_id': ['A Team cannot play against itself']}
            )
        return data

    def coerce_date_time(self, data):
        if data.get('date') and data.get('time'):
            data['match_datetime'] = datetime.combine(data['date'], data['time'])
            del data['date']
            del data['time']
        return data

    def create(self, validated_data, *args, **kwargs):
        data = self.coerce_date_time(validated_data)
        return super().create(data, *args, **kwargs)

    def update(self, obj, validated_data, *args, **kwargs):
        data = self.coerce_date_time(validated_data)
        return super().update(obj, data, *args, **kwargs)


class SetMatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Match
        fields = ('home_points', 'away_points')
    home_points = serializers.IntegerField(min_value=0, max_value=10000)
    away_points = serializers.IntegerField(min_value=0, max_value=10000)
