def no_empty_date(date):
    if not date:
        raise serializers.ValidationError('A date is required')

def no_empty_time(time):
    if not time:
        raise serializers.ValidationError('A time is required')
