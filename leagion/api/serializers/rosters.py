from rest_framework import serializers

from leagion.models import Roster, Batter, Team
from leagion.api.serializers.users import UserSerializer

class ShallowTeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = (
            'id', 'name', 'season'
        )

class BatterSerializer(serializers.ModelSerializer):
    player = UserSerializer()

    class Meta:
        model = Batter
        fields = ('id', 'index', 'player')

class RosterSerializer(serializers.ModelSerializer):
    team = ShallowTeamSerializer()
    players = BatterSerializer(source='batters', many=True)

    class Meta:
        model = Roster
        fields = ('id', 'team', 'players')
