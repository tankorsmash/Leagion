import re
import json

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

    return TemplateResponse(request,
            "leaderboard.html",
            {
                "players": players,
            })


def users(request, username):

    player, created = Player.objects.get_or_create(username=username)
    
    if request.method == "POST":
        post = request.POST
        if "json" in request.META.get("CONTENT_TYPE", ""):
            payload = json.loads(request.body)

            new_coins = payload.get("coins")
            payload.pop("coins")
            if new_coins:
                player.coins = int(new_coins) #idk if this will break over 2.4T
                buildings = json.dumps(payload)

                print "POST: player building json raw", buildings
                player.building_json = buildings

                player.save()
                print "saving player and building"
            else:
                print "found no coins in json request"

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

