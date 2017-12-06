from leagion.models import Match, Team, Season


def match_queryset_as_player(user):
    team_ids = user.teams.values_list('id', flat=True)
    season_ids = Season.objects.filter(
        teams__id__in=team_ids).values_list('id', flat=True)
    return Match.objects.filter(season__in=season_ids).distinct()
