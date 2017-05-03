from rest_framework import serializers
from leagion.models import League, Season
from leagion.api.serializers.seasons import SeasonSerializer, MySeasonSerializer

class ShallowSeasonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Season
        fields = (
            'id', 'start_date', 'end_date', 'league', 'teams',
			'pretty_date', 'pretty_name', 'matches'
        )
        read_only_fields = ("teams", "matches")

class LeagueSerializer(serializers.ModelSerializer):
    class Meta:
        model = League
        fields = (
            'id', 'name', 'seasons'
        )

    seasons = ShallowSeasonSerializer(many=True, read_only=True)


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
