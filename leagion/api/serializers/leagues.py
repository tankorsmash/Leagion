from rest_framework import serializers
from leagion.models import League, Season
from leagion.api.serializers.seasons import SeasonSerializer, MySeasonSerializer

class LeagueSerializer(serializers.ModelSerializer):
    class Meta:
        model = League
        fields = (
            'id', 'name', 'seasons'
        )

    seasons = SeasonSerializer(many=True, read_only=True)


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
