"""buildup_server URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from django.shortcuts import render_to_response
from django.db import models

from buildup import views

def changelog(request):
	return render_to_response("buildup_server/index.html", {})


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$', views.index),
    url(r'^get_vec2/$', views.get_vec2),
    url(r'^get_string/$', views.get_string),
    url(r'^changelog/$', changelog),

    url(r'^users/(?P<username>[a-zA-Z0-9]*)/$', views.users),
    url(r'^leaderboard/$', views.leaderboard),
]
