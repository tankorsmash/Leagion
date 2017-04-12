from rest_framework import serializers
from leagion.models import Season, Match, Team
from leagion.api.serializers.teams import TeamSerializer
from leagion.api.serializers.matches import MatchSerializer

class SeasonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Season
        fields = (
            'id', 'start_date', 'end_date', 'league', 'teams',
			'pretty_date', 'pretty_name', 'matches'
        )

    teams = TeamSerializer(many=True)
    matches = serializers.SerializerMethodField('get_ordered_matches')

    def get_ordered_matches(self, obj):
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
