from django.conf import settings
from django.conf.urls import url
from django.conf.urls.static import static

from leagion.api.views import (
    registration as reg_views,
    users as users_views,
    matches as matches_views,
    rosters as rosters_views,
    teams as teams_views,
    leagues as leagues_views,
    seasons as seasons_views,
)

urlpatterns = [
    url(r'^player/$', users_views.UserList.as_view(), name='api-player-list'),
    url(r'^player/(?P<player_id>\d+)/$', users_views.UserDetail.as_view(), name='api-player-detail'),

    url(r'^match/$', matches_views.MatchList.as_view(), name='api-match-list'),
    url(r'^match/(?P<match_id>\d+)/$', matches_views.MatchDetail.as_view(), name='api-match-detail'),

    url(r'^roster/$', rosters_views.RosterList.as_view(), name='api-roster-list'),
    url(r'^roster/(?P<roster_id>\d+)/$', rosters_views.RosterDetail.as_view(), name='api-roster-detail'),

    url(r'^team/$', teams_views.TeamList.as_view(), name='api-team-list'),
    url(r'^team/(?P<team_id>\d+)/$', teams_views.TeamDetail.as_view(), name='api-team-detail'),
    url(r'^me/team/$', teams_views.MyTeamList.as_view(), name='api-my-team-list'),

    url(r'^league/$', leagues_views.LeagueList.as_view(), name='api-league-list'),
    url(r'^league/(?P<league_id>\d+)/$', leagues_views.LeagueDetail.as_view(), name='api-league-detail'),
    url(r'^me/league/$', leagues_views.MyLeagueList.as_view(), name='api-my-league-list'),
    url(r'^me/league/(?P<league_id>\d+)/$', leagues_views.MyLeagueDetail.as_view(), name='api-my-league-detail'),

    url(r'^season/$', seasons_views.SeasonList.as_view(), name='api-season-list'),
    url(r'^season/(?P<season_id>\d+)/$', seasons_views.SeasonDetail.as_view(), name='api-season-detail'),
    url(r'^me/season/$', seasons_views.SeasonList.as_view(), name='api-my-season-list'),
    url(r'^me/season/(?P<season_id>\d+)/$', seasons_views.SeasonDetail.as_view(), name='api-my-season-detail'),

]
