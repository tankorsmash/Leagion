import json

from django.shortcuts import render

from django.http import HttpResponse, JsonResponse


def index(request):
    print "get index"
    return HttpResponse("Hello, world. You're at the polls index.") 

def get_string(request):
    print "get string"
    return HttpResponse("this is a string") 

def get_vec2(request):
    print "get vec2"
    return JsonResponse({
        'x': 200,
        'y': 200
        }) 
