from rest_framework import serializers
from leagion.models import Season, Match, Team, League, Location
from leagion.api.serializers.teams import TeamSerializer, ShallowMatchSerializer
from leagion.api.serializers.matches import MatchSerializer


class ShallowLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = (
            'id', 'name'
        )


class ShallowLeagueSerializer(serializers.ModelSerializer):
    class Meta:
        model = League
        fields = (
            'id', 'name', 'locations'
        )
    locations = ShallowLocationSerializer(read_only=True, many=True)


class ShallowTeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = (
            'id', 'name', 'win_draw_loss_points'
        )


class SeasonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Season
        fields = (
            'id', 'start_date', 'end_date', 'league', 'league_id', 'teams',
            'pretty_date', 'pretty_name', 'matches'
        )
        read_only_fields = ("teams", "matches")

    teams = ShallowTeamSerializer(many=True, read_only=True)
    matches = ShallowMatchSerializer(many=True, read_only=True)

    league_id = serializers.IntegerField() #writable, while the serialize is readonly
    league = ShallowLeagueSerializer(read_only=True)


class MySeasonSerializer(SeasonSerializer):
    class Meta(SeasonSerializer.Meta):
        fields = SeasonSerializer.Meta.fields + ('my_team',)

    my_team = serializers.SerializerMethodField('get_team')

    def get_team(self, obj):
        user = self.context['request'].user
        team = Team.objects.get(players=user)
        serializer = TeamSerializer(team, context=self.context)
        return serializer.data
