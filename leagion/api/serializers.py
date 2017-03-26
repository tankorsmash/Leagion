from django.conf.urls import url, include
from django.contrib.auth import get_user_model

from rest_framework import routers, serializers, viewsets

from leagion.models import Match, Roster, Team, League

User = get_user_model()

# Serializers define the API representation.

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'password', 'email', 'first_name', 'last_name')
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
            'id', 'match_datetime', 'location', 'league', 'duration_seconds',
            'away_team', 'away_points','away_team', 'away_points', 'status',
            'postponed_to', 'postponed_from', 'pretty_name',
        )
