from rest_framework import serializers
from django.contrib.auth import get_user_model

from leagion.models import Roster, Batter, Team
from leagion.api.serializers.users import UserSerializer

User = get_user_model()

class ShallowPlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id',)

class ShallowTeamSerializer(serializers.ModelSerializer):
    players = ShallowPlayerSerializer(many=True)

    class Meta:
        model = Team
        fields = (
            'id', 'name', 'season', 'players',
        )

class BatterSerializer(serializers.ModelSerializer):
    player = UserSerializer()

    class Meta:
        model = Batter
        fields = ('id', 'index', 'player')

class RosterSerializer(serializers.ModelSerializer):
    team = ShallowTeamSerializer()
    batters = BatterSerializer(many=True)
    not_playing_players = serializers.SerializerMethodField()

    class Meta:
        model = Roster
        fields = ('id', 'team', 'batters', 'not_playing_players')

    def get_not_playing_players(self, obj):

        player_ids = obj.players.values_list('id', flat=True)
        players = obj.team.players.exclude(id__in=player_ids)

        serializer = UserSerializer(players, many=True)
        return serializer.data
