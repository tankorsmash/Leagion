from rest_framework import serializers
from leagion.models import Match, Team, Location, Roster, Batter
from leagion.api.serializers.rosters import RosterSerializer


class ShallowTeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = (
            'id', 'name', 'season', 'logo_url'
        )

class ShallowLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = (
            'id', 'name'
        )

class MatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Match

        fields = (
            'id', 'match_datetime', 'location_id', 'location', 'season', 'duration_seconds',
            'home_team', 'home_team_id', 'home_points', 'home_roster',
            'away_team', 'away_team_id', 'away_points', 'away_roster',
            'status', 'completed', 'postponed_to', 'postponed_from',
            'pretty_name', 'pretty_date', 'pretty_time',
        )

    home_team = ShallowTeamSerializer(read_only=True)
    home_team_id = serializers.IntegerField(required=False)
    away_team = ShallowTeamSerializer(read_only=True)
    away_team_id = serializers.IntegerField(required=False)

    location = ShallowLocationSerializer(read_only=True)
    location_id = serializers.IntegerField(required=True)

    postponed_to = serializers.IntegerField(required=False, allow_null=True, default=None)
    postponed_from = serializers.IntegerField(read_only=True)

    def validate_home_team_id(self, home_team_id):
        if home_team_id is None and self.initial_data.get("home_roster") is None:
            raise serializers.ValidationError("Need either a home_team_id or a home_roster")

        if home_team_id == self.initial_data.get("away_team_id"):
            raise serializers.ValidationError("Home and Away teams can't be the same")

        return home_team_id

    def validate_away_team_id(self, away_team_id):
        if away_team_id is None and self.initial_data.get("away_roster") is None:
            raise serializers.ValidationError("Need either a away_team_id or a away_roster")

        if away_team_id == self.initial_data.get("home_team_id"):
            raise serializers.ValidationError("Home and Away teams can't be the same")

        return away_team_id

    def create(self, validated_data):
        created_match = super().create(validated_data)
        created_match.save()

        #create rosters if not passed in
        # NOTE no way to pass in a roster yet
        if created_match.home_roster == None:
            home_team = Team.objects.get(id=validated_data.get("home_team_id"))
            created_match.home_team = home_team
            home_roster = Roster.objects.create(
                team=home_team
            )
            home_roster.home_rosters.add(created_match)

            def create_batter(player_id):
                return Batter(player_id=player_id, roster_id=home_roster.id)
            new_batters = list(map(create_batter, home_team.players.values_list("id", flat=True)))
            Batter.objects.bulk_create(new_batters)

        if created_match.away_roster == None:
            away_team = Team.objects.get(id=validated_data.get("away_team_id"))
            created_match.away_team = away_team
            away_roster = Roster.objects.create(
                team=away_team
            )
            away_roster.away_rosters.add(created_match)

            def create_batter(player_id):
                return Batter(player_id=player_id, roster_id=away_roster.id)

            new_batters = list(map(create_batter, away_team.players.values_list("id", flat=True)))
            Batter.objects.bulk_create(new_batters)

        #save a second time to account for new team
        created_match.save()
        return created_match


class SetMatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Match

        fields = (
            'home_points', 'away_points',
        )
