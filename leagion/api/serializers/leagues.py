from rest_framework import serializers
from leagion.models import League, Season, User
from leagion.api.serializers.seasons import MySeasonSerializer


class ShallowPlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id',)
        read_only_fields = ('id',)


class ShallowSeasonSerializer(serializers.ModelSerializer):
    players = ShallowPlayerSerializer(many=True, read_only=True)

    class Meta:
        model = Season
        fields = (
            'id', 'start_date', 'end_date', 'league', 'teams',
            'pretty_date', 'pretty_name', 'matches', 'players',
            'matches_completed_count',
        )
        read_only_fields = ("teams", "matches")


class LeagueSerializer(serializers.ModelSerializer):
    class Meta:
        model = League
        fields = (
            'id', 'name', 'current_season', 'past_seasons',
            'future_seasons', 'commissioner',
        )

    current_season = ShallowSeasonSerializer(read_only=True)
    past_seasons = ShallowSeasonSerializer(many=True, read_only=True)
    future_seasons = ShallowSeasonSerializer(many=True, read_only=True)


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
