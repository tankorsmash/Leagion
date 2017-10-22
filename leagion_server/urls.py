"""leagion_server URL Configuration

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
from django.conf import settings
from django.conf.urls import url, include
from django.conf.urls.static import static
from django.views.static import serve

from django.contrib import admin

from leagion import views

from leagion.api.views import (
    registration as reg_views,
    users as users_views,
    matches as matches_views,
    rosters as rosters_views,
    teams as teams_views,
    leagues as leagues_views,
)

urlpatterns = []

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += [
    # authentication

    # django-rest-auth
    url(r'lin/', reg_views.LoginView.as_view(), name='rest_login'),
    url(r'lout/', reg_views.LogoutView.as_view(), name='rest_logout'),
    url(r'pswdrst/', reg_views.PasswordResetView.as_view(), name='rest_password_reset'),
    url(r'pswdrstcfm/', reg_views.PasswordResetConfirmView.as_view(), name='rest_password_reset_confirm'),
    url(r'pswdchg/', reg_views.PasswordChangeView.as_view(), name='rest_password_change'),
    url(r'rgstr/', reg_views.RegisterView.as_view(), name='rest_register'),
    url(r'vrfyeml/', reg_views.VerifyEmailView.as_view(), name='rest_verify_email'),

    #django-allauth
    url(r'^accounts/', include('allauth.urls')),

    #dont want the user views to be easily scriptable, so no 'login' or 'admin' as the patterns
    url(r'^man/', admin.site.urls),
    url(r'^clib/', views.PatternLibrary.as_view(), name="pattern-library"),

    url(r'^api/', include('leagion.api.urls')),

    url(r'^.*$', views.Main.as_view(), name="main"),
]
