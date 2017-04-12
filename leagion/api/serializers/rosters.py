from rest_framework import serializers

from leagion.models import Roster
from leagion.api.serializers.teams import TeamSerializer
from leagion.api.serializers.users import UserSerializer
from leagion.api.serializers.matches import MatchSerializer

class RosterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Roster
        fields = ('id', 'team', 'players', 'match',)

    team = TeamSerializer()
    players = UserSerializer(many=True)
    match = MatchSerializer()
