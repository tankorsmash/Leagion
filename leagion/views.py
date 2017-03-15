import re
import json
import datetime
import pprint

from django.core.urlresolvers import reverse
from django.shortcuts import render, render_to_response, get_object_or_404
from django.http import HttpResponse, JsonResponse

from django.views.generic import TemplateView, DetailView
from django.template.response import TemplateResponse

from django.db.models import Q

from django.utils.html import mark_safe


from leagion.models import User, Team, League, Match, Roster

# views
class Index(TemplateView):
    template_name = "index.html"

    def get_context_data(self):
        context = {"leagues": []}
        for league in League.objects.all():
            league_ctx = {
                "name": league.name,
                "teams": [],
                "detail_url": reverse("league-detail", args=(league.id,)),
            }
            for team in league.teams.all():
                team_ctx = {
                    "name": team.name,
                    "players": [],
                    "detail_url": reverse("team-detail", args=(team.id,)),
                }
                for player in team.players.all():
                    player_ctx = {
                        "full_name": "{} {}".format(player.first_name, player.last_name)
                    }
                    team_ctx["players"].append(player_ctx)

                league_ctx["teams"].append(team_ctx)

            context["leagues"].append(league_ctx)


        return context


class LeagueDetail(DetailView):
    template_name = "league_detail.html"

    context_object_name = "league"
    pk_url_kwarg = "league_id"
    queryset = League.objects.all()

    def get_context_data(self, object):
        context = super(LeagueDetail, self).get_context_data()
        league = context['league']
        context['matches'] = [{
            'location': match.location.name,
            'home_team': match.home_team.name,
            'home_points': match.home_points,
            'away_team': match.away_team.name,
            'away_points': match.away_points,
            'match_datetime': match.match_datetime,
        } for match in league.matches.all().order_by("match_datetime")]

        return context

class TeamDetail(DetailView):
    template_name = "team_detail.html"

    context_object_name = "team"
    pk_url_kwarg = "team_id"
    queryset = Team.objects.all()

    def get_context_data(self, object):
        context = super(TeamDetail, self).get_context_data()
        team = context['team']
        context['matches'] = [{
            'location': match.location.name,
            'home_team': match.home_team.name,
            'home_points': match.home_points,
            'away_team': match.away_team.name,
            'away_points': match.away_points,
            'match_datetime': match.match_datetime,
        } for match in team.league.matches.filter(Q(away_team=team)|Q(home_team=team)).order_by("match_datetime")]

        context['players'] = [{
            "full_name": "{} {}".format(player.first_name, player.last_name),
        } for player in team.players.all()]

        return context
