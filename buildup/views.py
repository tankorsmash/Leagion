import re
import json
import datetime
import pprint

from django.shortcuts import render, render_to_response, get_object_or_404

from django.template.response import TemplateResponse

from django.views.generic import TemplateView


from django.http import HttpResponse, JsonResponse

from buildup.models import Player
from buildup.utils import _pretty

# views
class Index(TemplateView):
    template_name = "index.html"


def changelog(request):
    #only works with the hardcoded file on the live server, not locally
    try:
        return render_to_response("buildup_server/index.html", {})
    except Exception as e: 
        print e, "this is supposed to be a TemplateDoesNot exist error"
        return TemplateResponse(request, "index.html")


class Leaderboard(TemplateView):
    template_name = "leaderboard.html"

    def get_context_data(self):
        players = Player.objects.all().order_by("-coins")
        players = sorted(players, key=lambda p: -p.total_building_levels)

        #FIXME replace this with django style if you can find it
        player_id = self.request.GET.get("username")

        return {
            "players": players,
            "player_id": player_id
        }


class ViewModel(object):
    pass


class Technology(ViewModel):
    def __init__(self, name, count):
        self.name = name.replace("tech_", "")
        self.count = _pretty(count)

class Building(ViewModel):
    def __init__(self, name, data):
        self.name = name
        self.level = _pretty(data.get("building_level"))

        self.techs = self.parse_techs(data)

    def parse_techs(self, data):
        techs = []
        for raw_tech_name, count in filter(lambda (k,v): k.startswith("tech_"), data.items()):
            techs.append(Technology(raw_tech_name, count))

        return techs



    def __repr__(self):
        return "<Building: Lv%i: %s>" % (self.level, self.name)

class UserDetail(TemplateView):
    template_name = "user_detail.html"

    def dispatch(self, *args, **kwargs):
        self.player = get_object_or_404(Player.objects, username=self.kwargs.get('username', ''))
        return super(UserDetail, self).dispatch(*args, **kwargs)

    def post(self, *args, **kwargs):
        payload = json.loads(self.request.body)

        #remove coins and last login from payload so that its purely building 
        # stuff by then time it saves
        new_coins = payload.pop("coins", None)
        if new_coins:
            self.player.coins = float(new_coins) #idk if this will break over 2.4T

        last_login = payload.pop("last_login", None)
        if last_login:
            last_login = datetime.datetime.fromtimestamp(float(last_login))
            self.player.last_login = last_login

        buildings = json.dumps(payload)

        print "POST: player data:" 
        pprint.pprint(payload)
        self.player.building_json = buildings

        self.player.save()

        return JsonResponse({})

    def get(self, *args, **kwargs):
        buildings_str = self.player.building_json
        building_json = json.loads(buildings_str)

        buildings = [Building(name, data) for name, data in building_json.items()]

        return TemplateResponse(self.request, "user_detail.html", {
            "player": self.player,
            "buildings": buildings,
            })
