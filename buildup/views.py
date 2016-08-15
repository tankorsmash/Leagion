import json

from django.shortcuts import render
from django.template.response import TemplateResponse

from django.http import HttpResponse, JsonResponse

from buildup.models import Player


def index(request):
    return TemplateResponse(request, "index.html")

def get_string(request):
    return HttpResponse("this is a string") 

def get_vec2(request):
    payload = {'x': 200, 'y': 200 }
    return JsonResponse(payload)

def leaderboard(request):

    players = Player.objects.all().order_by("-coins")
    players = sorted(players, key=lambda p: -p.total_building_levels)

    return TemplateResponse(request, "leaderboard.html", {"players": players})

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

        print "GET: player id", player.id
        buildings_str = player.building_json
        print "GET: player building json str", buildings_str
        building_json = json.loads(buildings_str)
        print "GET: player building json dict", building_json
        return TemplateResponse(request, "user_detail.html", {
            "player": player,
            "buildings": building_json
            })

