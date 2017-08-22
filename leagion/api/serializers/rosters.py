from rest_framework import serializers
from django.contrib.auth import get_user_model

from leagion.models import Roster, Batter, Team
from leagion.api.serializers.users import PublicUserSerializer

User = get_user_model()

class ShallowPlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id',)
        read_only_fields = ('id',)

class ShallowTeamSerializer(serializers.ModelSerializer):
    players = ShallowPlayerSerializer(many=True)

    class Meta:
        model = Team
        fields = (
            'id', 'name', 'season', 'players',
        )
        read_only_fields = (
            'id', 'name', 'season', 'players',
        )

class BatterSerializer(serializers.ModelSerializer):
    player = PublicUserSerializer(read_only=True)
    player_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), source='player')

    class Meta:
        model = Batter
        fields = ('id', 'index', 'player', 'player_id', 'roster')

class RosterSerializer(serializers.ModelSerializer):
    team = ShallowTeamSerializer(read_only=True)
    batters = BatterSerializer(many=True)

    class Meta:
        model = Roster
        fields = ('id', 'team', 'batters')

    def update(self, instance, validated_data):
        instance.batters.all().delete()
        serializer = BatterSerializer(validated_data['batters'], many=True, context=self.context)
        serializer.create(validated_data['batters'])
        return instance

