from rest_framework import generics, views as drf_views, filters

from django.db.models import Q

from leagion.models import League, Team, User, Season, Match, Roster

def is_moderator_or_better(user):
    """is user at least a moderator"""
    return user.is_staff or user.is_moderator

"""
Filter down by league commissioner
"""
def build_filter_users_to_commissioner(user):
    """filter down the users to the leagues the league commissioner can see"""
    return Q(teams__season__league__league_commissioners=user)

def build_filter_rosters_to_commissioner(user):
    """filter down the rosters to the rosters the league commissioner can see"""
    return Q(match__season__league__league_commissioners=user)

def build_filter_matches_to_commissioner(user):
    """filter down the matches to the matches the league commissioner can see"""
    return Q(season__league__league_commissioners=user)

def build_filter_seasons_to_commissioner(user):
    """filter down the seasons to the seasons the league commissioner can see"""
    return Q(league__league_commissioners=user)

def build_filter_teams_to_commissioner(user):
    """filter down the teams to the teams the league commissioner can see"""
    return Q(season__league__league_commissioners=user)

def build_filter_leagues_to_commissioner(user):
    """filter down the leagues to the leagues the league commissioner can see"""
    return Q(league_commissioners=user)

"""
Filter querysets down by standard player
"""
def build_filter_users_to_player(user):
    """filter down the users to the USERs the player can see"""
    return Q(id=user.id)

def build_filter_rosters_to_player(user):
    """filter down the rosters to the player can see"""
    return Q(players=user)

def build_filter_matches_to_player(user):
    """filter down the matches to the matches the player can see"""
    return Q((Q(home_roster__players=user)|Q(away_roster__players=user)))

def build_filter_seasons_to_player(user):
    """filter down the seasons to the seasons the player can see"""
    return Q(teams__players=user)

def build_filter_teams_to_player(user):
    """filter down the teams to the teams the player can see"""
    return Q(players=user)

def build_filter_leagues_to_player(user):
    """filter down the leagues to the leagues the player can see"""
    return Q(seasons__teams__players=user)


"""
a collection of filters associated with the relevant model
>>> leagues_comm_can_see = League.objects.filter(COMMISSIONER_FILTERS[League](commissioner))

a helper function is defined to make it easier to use, so the above becomes
>>> leagues_comm_can_see = filter_queryset_to_commissioner(commissioner, League.objects.all())
"""
COMMISSIONER_FILTERS = {
    League: lambda u: build_filter_leagues_to_commissioner(u),
    Season: lambda u: build_filter_seasons_to_commissioner(u),
    Roster: lambda u: build_filter_rosters_to_commissioner(u),
    Match: lambda u: build_filter_matches_to_commissioner(u),
    Team: lambda u: build_filter_teams_to_commissioner(u),
    User: lambda u: build_filter_users_to_commissioner(u),
}

def filter_queryset_to_commissioner(user, queryset):
    """
    filters a queryset down to whatever the league commissioner can see

    NOTE if they're moderator or better, it returns everything
    """
    if is_moderator_or_better(user):
        return queryset

    qs_filter = COMMISSIONER_FILTERS.get(queryset.model)(user)
    if qs_filter is None:
        raise Exception("{} model is not in list of filters for filtering down to a league commissioner".format(queryset.model))

    return queryset.filter(qs_filter)

PLAYER_FILTERS = {
    League: lambda u: build_filter_leagues_to_player(u),
    Season: lambda u: build_filter_seasons_to_player(u),
    Roster: lambda u: build_filter_rosters_to_player(u),
    Match: lambda u: build_filter_matches_to_player(u),
    Team: lambda u: build_filter_teams_to_player(u),
    User: lambda u: build_filter_users_to_player(u),
}

def filter_queryset_to_standard_user(user, queryset):
    """
    filters a queryset down to whatever the standard player can see

    NOTE if they're moderator or better, it returns everything
    """
    if is_moderator_or_better(user):
        return queryset

    qs_filter = PLAYER_FILTERS.get(queryset.model)(user)
    if qs_filter is None:
        raise Exception("{} model is not in list of filters for filtering down to a regular player".format(queryset.model))

    return queryset.filter(qs_filter)


def filter_request_queryset_generic(request, queryset, view):
    """
    filters a queryset down to what the user can see, depending on request method

    admins/mods/staff see everything
    commissioners can read and write their own leagues

    standard user/player can only read, nothing else
    """
    # TODO work out permissions, but permessions should add to queryset
    # NOT filter it
    return queryset
    # user = request.user

    # if is_moderator_or_better(user):
        # return queryset

    # if user.is_commissioner:
        # return filter_queryset_to_commissioner(user, queryset)

    # if request.method == "GET":
        # return filter_queryset_to_standard_user(user, queryset)
    # else:
        # return queryset.none()


class UserFilterBackend(filters.BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        return filter_request_queryset_generic(request, queryset, view)


class TeamFilterBackend(filters.BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        return filter_request_queryset_generic(request, queryset, view)


class LeagueFilterBackend(filters.BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        return filter_request_queryset_generic(request, queryset, view)
