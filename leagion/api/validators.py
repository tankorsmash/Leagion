from rest_framework import serializers


def no_empty_date(date):
    if not date:
        raise serializers.ValidationError('A date is required')


def no_empty_time(time):
    if not time:
        raise serializers.ValidationError('A time is required')


def no_empty_team(team):
    if not team:
        raise serializers.ValidationError({
            'team_id': 'Please select a team that the player will be on.'
        })
