import re
import json
import datetime
import pprint

from django.shortcuts import render
from django.shortcuts import render_to_response

from django.template.response import TemplateResponse


from django.http import HttpResponse, JsonResponse

from buildup.models import Player

# views
def index(request):
    return TemplateResponse(request, "index.html")


def changelog(request):
    #only works with the hardcoded file on the live server, not locally
    try:
        return render_to_response("buildup_server/index.html", {})
    except Exception as e: 
        print e, "this is supposed to be a TemplateDoesNot exist error"
        return TemplateResponse(request, "index.html")


def leaderboard(request):

    players = Player.objects.all().order_by("-coins")
    players = sorted(players, key=lambda p: -p.total_building_levels)

    player_id = request.GET.get("username")

    return TemplateResponse(request,
            "leaderboard.html",
            {
                "players": players,
                "player_id": player_id
            })


def users(request, username):
    player, created = Player.objects.get_or_create(username=username)
    
    if request.method == "POST":
        post = request.POST
        if "json" in request.META.get("CONTENT_TYPE", ""):
            payload = json.loads(request.body)

            new_coins = payload.get("coins")
            payload.pop("coins")

            last_login = payload.get("last_login")
            if last_login:
                last_login = datetime.datetime.fromtimestamp(float(last_login))
            payload.pop("last_login", None)

            player.coins = float(new_coins) #idk if this will break over 2.4T

            if last_login:
                player.last_login = last_login

            buildings = json.dumps(payload)

            print "POST: player data:" 
            pprint.pprint(payload)
            player.building_json = buildings

            player.save()
        else:
            print "need CONTENT_TYPE to contain 'json'"


        payload = {
            "username": player.username,
            "coins": player.coins
        }

        return JsonResponse(payload)

    elif request.method == "GET":

        buildings_str = player.building_json
        building_json = json.loads(buildings_str)
        return TemplateResponse(request, "user_detail.html", {
            "player": player,
            "buildings": building_json,
            })

