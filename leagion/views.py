import re
import json
import datetime
import pprint

from django.shortcuts import render, render_to_response, get_object_or_404

from django.template.response import TemplateResponse
from django.utils.html import mark_safe
from django.views.generic import TemplateView


from django.http import HttpResponse, JsonResponse

from leagion.models import User, Team, League, Match, Roster

# views
class Index(TemplateView):
    template_name = "index.html"

    def get_context_data(self):
        context = {"leagues": []}
        for league in League.objects.all():
            league_ctx = {
                "name": league.name,
                "teams": []
            }
            for team in league.teams.all():
                team_ctx = {
                    "name": team.name,
                    "players": []
                }
                for player in team.players.all():
                    player_ctx = {
                        "full_name": "{} {}".format(player.first_name, player.last_name)
                    }
                    team_ctx["players"].append(player_ctx)

                league_ctx["teams"].append(team_ctx)

            context["leagues"].append(league_ctx)


        return context
