import json

from django.shortcuts import render

from django.http import HttpResponse, JsonResponse

from buildup.models import Player


def index(request):
    return HttpResponse("<a href='/changelog'>CHANGELOG HERE</a>") 

def get_string(request):
    return HttpResponse("this is a string") 

def get_vec2(request):
    payload = {'x': 200, 'y': 200 }
    return JsonResponse(payload)

def users(request, username):

    player, created = Player.objects.get_or_create(username=username)
    
    if request.method == "POST":
        new_coins = request.POST.get("coins")
        if new_coins:
            player.coins = int(new_coins) #idk if this will break over 2.4b

            player.save()


    payload = {
            "username": player.username,
            "coins": player.coins
            }
    return JsonResponse(payload)

