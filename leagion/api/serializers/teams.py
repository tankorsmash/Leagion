from django.db.models import Q

from rest_framework import serializers
from leagion.models import Team, Match, League, Season, User
from leagion.api.serializers.users import UserSerializer
from leagion.api.serializers.matches import MatchSerializer


class ShallowLeagueSerializer(serializers.ModelSerializer):
    class Meta:
        model = League
        fields = (
            'id', 'name'
        )

class ShallowSeasonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Season
        fields = (
            'id', 'pretty_date', 'league'
        )

    league = ShallowLeagueSerializer(read_only=True)


class ShallowTeamSerializer(serializers.ModelSerializer):

    class Meta:
        model = Team

        fields = (
            'id', 'name'
        )

class ShallowMatchSerializer(serializers.ModelSerializer):
    home_team = ShallowTeamSerializer()
    away_team = ShallowTeamSerializer()

    class Meta:
        model = Match

        fields = (
            'id', 'match_datetime', 'location', 'season', 'duration_seconds',
            'home_team', 'home_points', 'away_team', 'away_points', 'status',
            'postponed_to', 'postponed_from', 'pretty_name', 'pretty_date',
            'pretty_time', 'home_roster', 'away_roster', 'completed'
        )

class PureTeamSerializer(serializers.ModelSerializer):
    """
    name and ids only, no nested
    """
    class Meta:
        model = Team
        fields = (
            'id', 'name', 'player_ids', 'season_id', 'home_match_ids', 'away_match_ids', 'captain_ids',
        )

    home_match_ids = serializers.PrimaryKeyRelatedField(queryset=Match.objects.all(), source="home_matches", many=True)
    away_match_ids = serializers.PrimaryKeyRelatedField(queryset=Match.objects.all(), source="away_matches", many=True)
    player_ids = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), source="players", many=True, read_only=False)
    captain_ids = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), source="captains", many=True, read_only=False)
    season_id = serializers.IntegerField()

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = (
            'id', 'name', 'player_ids', 'players', 'season_id', 'season', 'matches', 'captains'
        )

    matches = serializers.SerializerMethodField('get_ordered_matches')
    players = UserSerializer(many=True, read_only=True, required=False)
    player_ids = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), source="players", many=True, read_only=False)
    season = ShallowSeasonSerializer(read_only=True)
    season_id = serializers.IntegerField()

    def get_ordered_matches(self, team):
        matches = list(team.home_matches.all()) + list(team.away_matches.all())
        matches = sorted(matches, key=lambda m: m.match_datetime)

        serializer = ShallowMatchSerializer(matches, many=True)
        return serializer.data
