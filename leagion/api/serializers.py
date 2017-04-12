from django.conf.urls import url, include
from django.contrib.auth import get_user_model
from django.db.models import Q

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
            'home_team', 'home_points', 'away_team', 'away_points', 'status',
            'postponed_to', 'postponed_from', 'pretty_name', 'pretty_date',
            'pretty_time'
        )


class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = (
            'id', 'name', 'players', 'season', 'matches'
        )

    matches = serializers.SerializerMethodField('get_ordered_matches')
    players = UserSerializer(many=True)

    def get_ordered_matches(self, obj):
        user = self.context['request'].user

        matches = Match.objects.filter(
            Q(home_team=obj) |
            Q(away_team=obj)
        ).order_by('match_datetime')

        serializer = MatchSerializer(matches, many=True)
        return serializer.data


class SeasonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Season
        fields = (
            'id', 'start_date', 'end_date', 'league', 'teams', 'pretty_date', 'matches'
        )

    teams = TeamSerializer(many=True)
    matches = serializers.SerializerMethodField('get_ordered_matches')

    def get_ordered_matches(self, obj):
        user = self.context['request'].user

        matches = Match.objects.filter(season=obj).order_by('match_datetime')

        serializer = MatchSerializer(matches, many=True)
        return serializer.data


class MySeasonSerializer(SeasonSerializer):
    class Meta(SeasonSerializer.Meta):
        fields = SeasonSerializer.Meta.fields + ('my_team',)

    my_team = serializers.SerializerMethodField('get_team')

    def get_team(self, obj):
        user = self.context['request'].user
        team = Team.objects.get(players=user)
        serializer = TeamSerializer(team, context=self.context)
        return serializer.data


class LeagueSerializer(serializers.ModelSerializer):
    class Meta:
        model = League
        fields = (
            'id', 'name', 'seasons'
        )

    seasons = SeasonSerializer(many=True)


class MyLeagueSerializer(LeagueSerializer):
    my_seasons = serializers.SerializerMethodField('get_seasons')

    class Meta:
        model = League
        fields = (
            'id', 'name', 'my_seasons'
        )

    def get_seasons(self, obj):
        user = self.context['request'].user
        seasons = Season.objects.filter(teams__players=user)
        serializer = MySeasonSerializer(seasons, many=True, context=self.context)
        return serializer.data


class RosterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Roster
        fields = ('id', 'team', 'players', 'match',)

    team = TeamSerializer()
    players = UserSerializer(many=True)
    match = MatchSerializer()
