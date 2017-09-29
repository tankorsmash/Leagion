from rest_framework import generics, views as drf_views, filters

from leagion.models import League, Team, User

def is_moderator_or_better(user):
    """is user at least a moderator"""
    return user.is_staff or user.is_moderator

def build_filter_users_to_commissioner(user):
    """filter down the users to the leagues the league commissioner can see"""
    return Q(teams__season__league__league_commissioners=user)

def build_filter_teams_to_commissioner(user):
    """filter down the teams to the leagues the league commissioner can see"""
    return Q(season__league__league_commissioners=user)

def build_filter_leagues_to_commissioner(user):
    """filter down the leagues to the leagues the league commissioner can see"""
    return Q(league_commissioners=user)


"""
a collection of filters associated with the relevant model
>>> leagues_comm_can_see = League.objects.filter(COMMISSIONER_FILTERS[League](commissioner))

a helper function is defined to make it easier to use, so the above becomes
>>> leagues_comm_can_see = filter_queryset(commissioner, League.objects.all())
"""
COMMISSIONER_FILTERS = {
    League: lambda u: build_filter_leagues_to_commissioner(u),
    Team: lambda u: build_filter_teams_to_commissioner(u),
    User: lambda u: build_filter_users_to_commissioner(u),
}


def filter_queryset(user, queryset):
    if is_moderator_or_better(user):
        return queryset

    qs_filter = COMMISSIONER_FILTERS.get(queryset.modal)
    if qs_filter is None:
        raise Exception("{} model is not in list of filters for filtering down to a league commissioner".format(queryset.model))

    return queryset.filter(qs_filter)


class UserFilterBackend(filters.BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        return filter_queryset(request.user, queryset)


class TeamFilterBackend(filters.BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        return filter_queryset(request.user, queryset)


class LeagueFilterBackend(filters.BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        return filter_queryset(request.user, queryset)
