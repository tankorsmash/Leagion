import json

from django.shortcuts import render

from django.http import HttpResponse, JsonResponse


def index(request):
    return HttpResponse("Changelog will be at /changelog soon!") 

def get_string(request):
    return HttpResponse("this is a string") 

def get_vec2(request):
    return JsonResponse({
        'x': 200,
        'y': 200
        }) 
