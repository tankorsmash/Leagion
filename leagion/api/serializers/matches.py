from rest_framework import serializers

from leagion.models import Match
class MatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Match
        fields = (
            'id', 'match_datetime', 'location', 'season', 'duration_seconds',
            'home_team', 'home_points', 'away_team', 'away_points', 'status',
            'postponed_to', 'postponed_from', 'pretty_name', 'pretty_date',
            'pretty_time'
        )
