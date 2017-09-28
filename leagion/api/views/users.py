from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404

from rest_framework.response import Response
from rest_framework import generics, views as drf_views, filters

from leagion.api.serializers.users import UserSerializer, PublicUserSerializer

from leagion.models import Season

from leagion.utils import reverse_js

User = get_user_model()

class UserFilterBackend(filters.BaseFilterBackend):
    def filter_queryset(self, request, user_qs, view):
        user = request.user
        if user.is_staff or user.is_moderator:
            return user_qs

        return user_qs.filter(teams__season__league__league_commissioners=user)


@reverse_js
class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all().prefetch_related(
        "teams"
    )
    serializer_class = UserSerializer
    filter_backends = (UserFilterBackend,)


@reverse_js
class UserDetail(generics.RetrieveUpdateAPIView):
    lookup_url_kwarg = "player_id"

    queryset = User.objects.all().prefetch_related(
        "teams"
    )
    serializer_class = UserSerializer
    filter_backends = (UserFilterBackend,)


@reverse_js
class AddLeaguesToCommission(drf_views.APIView):
    lookup_url_kwarg = "player_id"

    queryset = User.objects.all()

    def patch(self, request, player_id=None):
        player = get_object_or_404(self.queryset, id=player_id)

        #validate league ids
        league_ids = request.data.get('league_ids')
        if not league_ids:
            raise Http404("Missing league ids")

        try:
            league_ids = list(map(lambda pid: int(pid), league_ids))
        except ValueError:
            raise Http404("Invalid league ids. Numbers only")

        old_count = player.leagues_commissioned.count()
        player.leagues_commissioned.add(*league_ids)
        new_count = player.leagues_commissioned.count()

        #commission someone if they're in control of a league
        if new_count > 0:
            player.is_commissioner = True
            player.save()

        return Response("Success! Added {} new leagues_commissioned".format(new_count-old_count))


@reverse_js
class RemoveLeaguesToCommission(drf_views.APIView):
    lookup_url_kwarg = "player_id"

    queryset = User.objects.all()

    def patch(self, request, player_id=None):
        player = get_object_or_404(self.queryset, id=player_id)

        #validate league ids
        league_ids = request.data.get('league_ids')
        if not league_ids:
            raise Http404("Missing league ids")

        try:
            league_ids = list(map(lambda pid: int(pid), league_ids))
        except ValueError:
            raise Http404("Invalid league ids. Numbers only")

        old_count = player.leagues_commissioned.count()
        player.leagues_commissioned.remove(*league_ids)
        new_count = player.leagues_commissioned.count()

        #uncommission someone if they're out of leagues.
        if new_count < 1:
            player.is_commissioner = False
            player.save()

        return Response("Success! Added {} new leagues_commissioned".format(new_count-old_count))




@reverse_js
class MyUserDetailsView(generics.RetrieveUpdateAPIView):
    """ GET, PUT, and PATCH current users details """
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

    def get_queryset(self):
        return get_user_model().objects.none()

@reverse_js
class PublicPlayerView(generics.RetrieveAPIView):
    """ get public info for users the current user can see """
    serializer_class = PublicUserSerializer
    lookup_url_kwarg = "player_id"

    def get_queryset(self):
        teams = self.request.user.teams.all()
        seasons = Season.objects.filter(teams__in=teams).distinct()
        return User.objects.filter(teams__season__in=seasons).distinct()
