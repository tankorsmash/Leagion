import re
import json
import datetime
from collections import Counter

from django.core.urlresolvers import reverse
from django.shortcuts import render, render_to_response, get_object_or_404
from django.http import HttpResponse, JsonResponse

from django.views.generic import TemplateView, DetailView
from django.template.response import TemplateResponse

from django.db.models import Q

from django.utils.html import mark_safe

from leagion.models import User, Team, League, Match, Roster

class Main(TemplateView):
    template_name = "react/main.html"

class Public(TemplateView):
    template_name = "react/public.html"

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
            matches = list(league.matches.all().values("id", "home_team_id", "away_team_id"))

            for team in league.teams.all():
                team_ctx = {
                    "name": team.name,
                    "players": [],
                    "detail_url": reverse("team-detail", args=(team.id,)),
                    "matches_played": len([m for m in matches if m['home_team_id'] == team.id or m['away_team_id'] == team.id]),
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
            'match_detail_url': reverse("match-detail", args=(match.id,)),
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

        matches = team.league.matches.filter(
            Q(away_team=team)|Q(home_team=team)
        ).order_by("match_datetime").select_related("location")[:15]

        roster_player_ids = Roster.objects.filter(
            team=team
        ).values_list("players__id", flat=True)
        matches_played = Counter(roster_player_ids) #fuck yeah python

        context['matches'] = [{
            'location': match.location.name,
            'match_datetime': match.match_datetime,
            'match_detail_url': reverse("match-detail", args=(match.id,)),

            'home_team': match.home_team.name,
            'home_points': match.home_points,
            'away_team': match.away_team.name,
            'away_points': match.away_points,

            'is_home_win': match.is_home_win,
            'is_away_win': match.is_away_win,

            'is_draw': match.is_draw,
            'team_won': match.get_winning_team() == team,
            'status': match.get_status_for_team(team),
        } for match in matches]

        context['players'] = [{
            "full_name": "{} {}".format(player.first_name, player.last_name),
            "detail_url": reverse("player-detail", args=(player.id,)),
            "matches_played": matches_played[player.id],
        } for player in team.players.all()]

        return context


class MatchDetail(DetailView):
    template_name = "match_detail.html"

    context_object_name = "match"
    pk_url_kwarg = "match_id"
    queryset = Match.objects.all()

    def build_match_context(self, match):
        """
        can be the postponed match
        """

        if match is None:
            return {}

        return {
            'location': match.location.name,
            'match_datetime': match.match_datetime,

            'home_team': match.home_team.name,
            'home_points': match.home_points,
            'away_team': match.away_team.name,
            'away_points': match.away_points,

            'is_home_win': match.is_home_win,
            'is_away_win': match.is_away_win,

            'is_draw': match.is_draw,

            'status': match.get_status_display(),
            'postponed_match': self.build_match_context(match.postponed_to),
        }

    def get_context_data(self, object):
        context = super(MatchDetail, self).get_context_data()
        match = context['match']
        home_team = match.home_team
        away_team = match.away_team

        home_roster_player_ids = Roster.objects.filter(
            team=home_team
        ).values_list("players__id", flat=True)
        home_matches_played = Counter(home_roster_player_ids)

        away_roster_player_ids = Roster.objects.filter(
            team=away_team
        ).values_list("players__id", flat=True)
        away_matches_played = Counter(away_roster_player_ids)

        context['match'] = self.build_match_context(match)

        context['home_team'] = {
            'roster': [{
                    "full_name": "{} {}".format(player.first_name, player.last_name),
                    "matches_played": home_matches_played[player.id],
                } for player in home_team.players.filter(id__in=match.rosters.get(team_id=home_team.id).players.values_list("id", flat=True))
            ]
        }

        context['away_team'] = {
            'roster': [{
                    "full_name": "{} {}".format(player.first_name, player.last_name),
                    "matches_played": away_matches_played[player.id],
                } for player in away_team.players.filter(id__in=match.rosters.get(team_id=away_team.id).players.values_list("id", flat=True))
            ]
        }

        return context


class PlayerDetail(DetailView):
    template_name = "player_detail.html"

    context_object_name = "player"
    pk_url_kwarg = "player_id"
    queryset = User.objects.all()

    def get_context_data(self, object):
        player = object
        context = super(PlayerDetail, self).get_context_data()
        context["full_name"] = "{} {}".format(player.first_name, player.last_name)

        teams = player.teams.all().select_related("league")
        leagues = []
        matches = []
        for team in teams:
            if team.league not in leagues:
                leagues.append(team.league)

            matches.extend([m for m in team.home_matches.all()])
            matches.extend([m for m in team.away_matches.all()])

        leagues_ctx = [{
            "name": league.name,
            "detail_url": reverse("league-detail", args=(league.id,))
        } for league in leagues]
        context['leagues'] = leagues_ctx

        teams_ctx = [{
            "name": team.name,
            "detail_url": reverse("team-detail", args=(team.id,))
        } for team in teams]
        context['teams'] = teams_ctx

        matches_ctx = [{
            "name": match.pretty_name,
            "detail_url": reverse("match-detail", args=(match.id,))
        } for match in matches]
        context['matches'] = matches_ctx

        return context
