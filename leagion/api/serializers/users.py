from django.contrib.auth import get_user_model

from rest_framework import serializers

from leagion.models import Team, League
from leagion.utils import id_generator
User = get_user_model()

class ShallowTeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = (
            'id', 'name', 'season'
        )


class ShallowLeagueSerializer(serializers.ModelSerializer):
    class Meta:
        model = League
        fields = (
            'id', 'name',
        )


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id', 'password', 'email',
            'first_name', 'last_name',
            'full_name', 'default_phonenumber',
            'alt_phonenumber', 'teams',
            'captain_of_teams', 'leagues_commissioned',
            'is_commissioner', 'is_staff', 'is_moderator',
            'avatar', 'avatar_url', 'status',

            #write_only
            'set_teams',
        )
        extra_kwargs = {
            'password': {'write_only': True, 'required': False},
            'captain_of_teams': {'required': False},
            'id': {'read_only': True},
        }

    teams = ShallowTeamSerializer(many=True, read_only=True)
    set_teams = serializers.ListField(required=False, write_only=True)
    leagues_commissioned = ShallowLeagueSerializer(many=True, read_only=True)
    avatar = serializers.ImageField(required=False)

    def create(self, validated_data):
        user = User.objects.create(
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
        )

        user.set_password(
            validated_data.get('password') or id_generator(size=10))

        user.save()

        team_ids = validated_data.get('set_teams', [])
        user.teams.set(Team.objects.filter(id__in=team_ids))
        user.captain_of_teams.set(validated_data.get('captain_of_teams', []))

        user.save()

        return user


class PublicUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = (
            'id', 'email', 'first_name', 'last_name', 'full_name',
            'default_phonenumber', 'alt_phonenumber', 'teams', 'captain_of_teams',
            'avatar_url'
        )

        read_only_fields = (
            'id', 'email', 'first_name', 'last_name', 'full_name',
            'default_phonenumber', 'alt_phonenumber', 'teams', 'captain_of_teams',
            'avatar_url'
        )
