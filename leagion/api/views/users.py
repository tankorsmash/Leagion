from django.contrib.auth import get_user_model

from rest_framework import generics, views as drf_views

from leagion.api.serializers.users import UserSerializer, PublicUserSerializer

from leagion.models import Season

from leagion.utils import reverse_js

User = get_user_model()


@reverse_js
class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all().prefetch_related(
        "teams"
    )
    serializer_class = UserSerializer


@reverse_js
class UserDetail(generics.RetrieveUpdateAPIView):
    lookup_url_kwarg = "player_id"

    queryset = User.objects.all().prefetch_related(
        "teams"
    )
    serializer_class = UserSerializer

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
