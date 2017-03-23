"""leagion_server URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls import url
from django.conf.urls.static import static

from django.contrib import admin
from django.contrib.auth import views as auth_views

from django.db import models
from django.contrib import admin

from leagion import views
from leagion.api import views as api_views


urlpatterns = [
    #dont want the user views to be easily scriptable, so no 'login' or 'admin' as the patterns
    url(r'^man/', admin.site.urls),
    url(r'^lin/$', auth_views.login, name='login'),
    url(r'^lout/$', auth_views.logout, name='logout'),

    url(r'^$', views.Index.as_view(), name="index"),
    url(r'^root/$', views.Root.as_view(), name="root"),
    url(r'^league/(?P<league_id>\d+)/$', views.LeagueDetail.as_view(), name="league-detail"),
    url(r'^team/(?P<team_id>\d+)/$', views.TeamDetail.as_view(), name="team-detail"),
    url(r'^match/(?P<match_id>\d+)/$', views.MatchDetail.as_view(), name="match-detail"),
    url(r'^player/(?P<player_id>\d+)/$', views.PlayerDetail.as_view(), name="player-detail"),

    url(r'^api/player/$', api_views.UserList.as_view(), name='api-player-list'),
    url(r'^api/player/(?P<player_id>\d+)/$', api_views.UserDetail.as_view(), name='api-player-detail'),
    url(r'^api/match/$', api_views.MatchList.as_view(), name='api-match-list'),
    url(r'^api/match/(?P<match_id>\d+)/$', api_views.MatchDetail.as_view(), name='api-match-detail'),

] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
