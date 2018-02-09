from rest_framework import serializers
from leagion.models import Team


def no_empty_date(date):
    if not date:
        raise serializers.ValidationError('A date is required')


def no_empty_time(time):
    if not time:
        raise serializers.ValidationError('A time is required')


def no_empty_team(team_id):
    if team_id and Team.objects.filter(id=team_id).exists():
        return
    else:
        raise serializers.ValidationError({
            'team_id': 'Please select a team that the player will be on.'
        })
