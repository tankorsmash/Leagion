from django.conf import settings
from django.conf.urls import url
from django.conf.urls.static import static

from leagion.api.views import (
    registration as reg_views,
    users as users_views,
    locations as locations_views,
    matches as matches_views,
    rosters as rosters_views,
    teams as teams_views,
    leagues as leagues_views,
    seasons as seasons_views,
    stats as stats_views,
    constants as const_views,
)

urlpatterns = [
    url(r'^stats/$', stats_views.StatsIndex.as_view(), name='api-stats-index'),

    url(r'me/$', users_views.MyUserDetailsView.as_view(), name='api-my-details'),

    url(r'^me/comm/player/$', users_views.MyCommUserList.as_view(), name='api-my-comm-player-list'),
    url(r'^me/comm/player/(?P<player_id>\d+)/$', users_views.MyCommUserDetail.as_view(), name='api-my-comm-player-detail'),
    url(r'^player/(?P<player_id>\d+)/commissioner-add/$', users_views.AddLeaguesToCommission.as_view(), name='api-player-commissioner-add'),
    url(r'^player/(?P<player_id>\d+)/commissioner-remove/$', users_views.RemoveLeaguesToCommission.as_view(), name='api-player-commissioner-remove'),
    url(r'^public-player/(?P<player_id>\d+)/$', users_views.PublicPlayerView.as_view(), name='api-my-public-player-detail'),

    url(r'^me/comm/match/$', matches_views.MyCommMatchList.as_view(), name='api-my-comm-match-list'),
    url(r'^me/comm/match/(?P<match_id>\d+)/$', matches_views.MyCommMatchDetail.as_view(), name='api-my-comm-match-detail'),
    url(r'^set-match-score/(?P<match_id>\d+)/$', matches_views.SetMatchScore.as_view(), name='api-set-match-score'),
    url(r'^me/match/$', matches_views.MyMatchList.as_view(), name='api-my-match-list'),
    url(r'^me/match/(?P<match_id>\d+)/$', matches_views.MyMatchDetail.as_view(), name='api-my-match-detail'),

    url(r'^roster/$', rosters_views.RosterList.as_view(), name='api-roster-list'),
    url(r'^roster/(?P<roster_id>\d+)/$', rosters_views.RosterDetail.as_view(), name='api-roster-detail'),

    url(r'^me/comm/team/$', teams_views.MyCommTeamList.as_view(), name='api-my-comm-team-list'),
    url(r'^me/comm/team/(?P<team_id>\d+)/$', teams_views.MyCommTeamDetail.as_view(), name='api-my-comm-team-detail'),
    url(r'^team/(?P<team_id>\d+)/add-players/$', teams_views.AddPlayersToTeam.as_view(), name='api-team-players-add'),
    url(r'^team/(?P<team_id>\d+)/remove-players/$', teams_views.RemovePlayersFromTeam.as_view(), name='api-team-players-remove'),
    url(r'^me/team/$', teams_views.MyTeamList.as_view(), name='api-my-team-list'),
    url(r'^me/team/(?P<team_id>\d+)/$', teams_views.MyTeamDetail.as_view(), name='api-my-team-detail'),

    url(r'^me/comm/league/$', leagues_views.MyCommLeagueList.as_view(), name='api-my-comm-league-list'),
    url(r'^me/comm/league/(?P<league_id>\d+)/$', leagues_views.MyCommLeagueDetail.as_view(), name='api-my-comm-league-detail'),
    url(r'^me/league/$', leagues_views.MyLeagueList.as_view(), name='api-my-league-list'),
    url(r'^me/league/(?P<league_id>\d+)/$', leagues_views.MyLeagueDetail.as_view(), name='api-my-league-detail'),

    url(r'^me/comm/season/$', seasons_views.MyCommSeasonList.as_view(), name='api-my-comm-season-list'),
    url(r'^me/comm/season/(?P<season_id>\d+)/$', seasons_views.MyCommSeasonDetail.as_view(), name='api-my-comm-season-detail'),
    url(r'^me/season/$', seasons_views.MySeasonList.as_view(), name='api-my-season-list'),
    url(r'^me/season/(?P<season_id>\d+)/$', seasons_views.MySeasonDetail.as_view(), name='api-my-season-detail'),

    url(r'^me/comm/location/$', locations_views.MyCommLocationList.as_view(), name='api-my-comm-location-list'),
    url(r'^me/comm/location/(?P<location_id>\d+)/$', locations_views.MyCommLocationDetail.as_view(), name='api-my-comm-location-detail'),

    url(r'^site-constants/$', const_views.SiteConstants.as_view(), name='api-site-constants'),

]
