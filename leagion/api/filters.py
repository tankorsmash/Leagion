from rest_framework import generics, views as drf_views, filters


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


class UserFilterBackend(filters.BaseFilterBackend):
    def filter_queryset(self, request, user_qs, view):
        user = request.user
        if is_moderator_or_better(user):
            return user_qs

        return user_qs.filter(build_filter_users_to_commissioner(user))


class TeamFilterBackend(filters.BaseFilterBackend):
    def filter_queryset(self, request, team_qs, view):
        user = request.user
        if is_moderator_or_better(user):
            return team_qs

        return team_qs.filter(build_filter_teams_to_commissioner(user))


class LeagueFilterBackend(filters.BaseFilterBackend):
    def filter_queryset(self, request, league_qs, view):
        user = request.user
        if is_moderator_or_better(user):
            return league_qs

        return league_qs.filter(build_filter_leagues_to_commissioner(user))
