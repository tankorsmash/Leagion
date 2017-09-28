from rest_framework import generics, views as drf_views, filters


class UserFilterBackend(filters.BaseFilterBackend):
    def filter_queryset(self, request, user_qs, view):
        user = request.user
        if user.is_staff or user.is_moderator:
            return user_qs

        return user_qs.filter(teams__season__league__league_commissioners=user)


class TeamFilterBackend(filters.BaseFilterBackend):
    def filter_queryset(self, request, team_qs, view):
        user = request.user
        if user.is_staff or user.is_moderator:
            return team_qs

        return team_qs.filter(season__league__league_commissioners=user)


class LeagueFilterBackend(filters.BaseFilterBackend):
    def filter_queryset(self, request, league_qs, view):
        user = request.user
        if user.is_staff or user.is_moderator:
            return league_qs

        return league_qs.filter(league_commissioners=user)
