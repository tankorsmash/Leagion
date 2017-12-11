from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404

from rest_framework.response import Response
from rest_framework import generics, mixins, views as drf_views, filters

from leagion.api.serializers.users import UserSerializer, PublicUserSerializer
from leagion.api.validators import no_empty_team

from leagion.models import Season, Team

from leagion.utils import reverse_js

User = get_user_model()


@reverse_js
class MyCommUserList(generics.ListCreateAPIView):
    serializer_class = UserSerializer
    filter_fields = ('teams__season', 'teams')
    search_fields = ('first_name', 'last_name', 'email', 'teams__name')

    def get_queryset(self):
        league_ids = self.request.user.leagues_commissioned.values_list('id', flat=True)
        return User.objects.filter(
            teams__season__league_id__in=league_ids
        ).distinct().prefetch_related("teams")

    def create(self, request, *args, **kwargs):
        team_id = request.data.get('team_id')
        no_empty_team(team_id)
        request.data['set_teams'] = [team_id]
        request.data['set_captain_of_teams'] = request.data['set_teams'] if request.data.get('is_captain') else []
        del request.data['team_id']
        del request.data['is_captain']
        return super().create(request, *args, **kwargs)

    def update_partial(self, queryset, *args, **kwargs):
        pass


@reverse_js
class MyCommUserDetail(generics.RetrieveUpdateAPIView):
    lookup_url_kwarg = "player_id"
    serializer_class = UserSerializer
    filter_fields = ('teams__season',)

    def get_queryset(self):
        league_ids = self.request.user.leagues_commissioned.values_list('id', flat=True)
        return User.objects.filter(
            teams__season__league_id__in=league_ids
        ).distinct().prefetch_related("teams")


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
