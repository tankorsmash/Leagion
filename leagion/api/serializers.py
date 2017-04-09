from django.conf.urls import url, include
from django.contrib.auth import get_user_model

from rest_framework import routers, serializers, viewsets

from leagion.models import Match, Roster, Team, League, Season

User = get_user_model()

# Serializers define the API representation.

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'password', 'email', 'first_name', 'last_name', 'full_name')
        extra_kwargs = {
            'password': {'write_only': True},
            'id': {'read_only': True}
        }

    def create(self, validated_data):
        user = User.objects.create(
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )

        user.set_password(validated_data['password'])
        user.save()

        return user

class MatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Match
        fields = (
            'id', 'match_datetime', 'location', 'season', 'duration_seconds',
            'home_team', 'home_points','away_team', 'away_points', 'status',
            'postponed_to', 'postponed_from', 'pretty_name',
        )


class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = (
            'id', 'name', 'players', 'season'
        )

    players = UserSerializer(many=True)


class SeasonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Season
        fields = (
            'id', 'start_date', 'end_date', 'league', 'teams', 'pretty_name',
        )

    teams = TeamSerializer(many=True)


class LeagueSerializer(serializers.ModelSerializer):
    class Meta:
        model = League
        fields = (
            'id', 'name', 'seasons'
        )

class SeasonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Season
        fields = (
            'id', 'start_date', 'end_date', 'teams'
        )

    seasons = SeasonSerializer(many=True)

class MySeasonSerializer(serializers.ModelSerializer):
    my_team = serializers.SerializerMethodField('get_team')

    class Meta:
        model = Season
        fields = (
            'id', 'name', 'teams', 'my_team'
        )

    def get_team(self, obj):
        user = self.context['request'].user
        team = Team.objects.get(players=user)
        serializer = TeamSerializer(team)
        return serializer.data

class RosterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Roster
        fields = ('id', 'team', 'players', 'match',)

    team = TeamSerializer()
    players = UserSerializer(many=True)
    match = MatchSerializer()
