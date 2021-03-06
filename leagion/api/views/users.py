import premailer

from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from django.core.exceptions import ObjectDoesNotExist
from django.core.mail import send_mail
from django.template.loader import render_to_string

from django.conf import settings

from rest_framework.response import Response
from rest_framework import generics, mixins, views as drf_views, filters
from rest_framework import status

from leagion.api.serializers.users import UserSerializer, InviteUserSerializer, PublicUserSerializer
from leagion.api.validators import no_empty_team

from leagion.models import Season, Team

from leagion.utils import reverse_js, id_generator
from leagion.cache import user_cache_key
from leagion.constants import ROLES

User = get_user_model()

def send_user_email_on_join(user, team_id):
    password_placeholder = settings.LEAGION_DEFAULT_PASSWORD if user.check_password(settings.LEAGION_DEFAULT_PASSWORD) else "previously entered password"
    context = {
        'user_full_name': user.full_name,
        'leagion_url': settings.LEAGION_ROOT_URL,
        'user_email': user.email,
        'user_password': password_placeholder,
    }
    body = render_to_string("email/invite_email_template.html", context=context)
    #inlines styles etc for emails
    body = premailer.transform(body)

    send_mail(
        'You have been invited to join a Leagion team',
        body, #TODO make this just plain text
        'leagionapp@gmail.com',
        [user.email],
        fail_silently=False,
        html_message=body,
    )

@reverse_js
class InviteUserView(generics.CreateAPIView):
    """
    get or create a user and add them to team and send an email with a link
    """

    serializer_class = InviteUserSerializer

    def perform_create(self, serializer):
        self.user = serializer.save()

    def post(self, request, *args, **kwargs):
        data = request.data
        response = None

        team_id = data.get('team_id')

        try:
            self.user = User.objects.get(email__iexact=data.get('email', ''))
        except ObjectDoesNotExist:
            response = super().create(request, *args, **kwargs)
        else:
            #validate that there's a team that exists
            no_empty_team(team_id)

        # assign data
        user = self.user

        is_captain = data.get('is_captain', False)

        # add fields
        user.teams.add(team_id)
        if is_captain:
            user.captain_of_teams.add(team_id)

        send_user_email_on_join(user, team_id)

        return response or Response('success', status=status.HTTP_200_OK)


@reverse_js
class MyCommUserList(generics.ListAPIView):
    serializer_class = UserSerializer
    filter_fields = ('teams__season', 'teams')
    search_fields = ('first_name', 'last_name', 'email', 'teams__name')

    def get_queryset(self):
        league_ids = self.request.user.leagues_commissioned.values_list('id', flat=True)
        return User.objects.filter(
            teams__season__league_id__in=league_ids
        ).distinct().prefetch_related("teams")


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

    def partial_update(self, request, *args, **kwargs):
        user = User.objects.get(id=kwargs.get('player_id'))
        remove_team_id = request.data.get('remove_team_id')
        remove_captain_team_id = request.data.get('remove_captain_team_id')
        add_captain_team_id = request.data.get('add_captain_team_id')
        request.data.pop('remove_team_id', None)
        request.data.pop('remove_captain_team_id', None)
        request.data.pop('add_captain_team_id', None)

        response = super().partial_update(request, *args, **kwargs)

        if remove_team_id:
            team = Team.objects.get(id=remove_team_id)
            user.teams.remove(team)
        if remove_captain_team_id:
            team = Team.objects.get(id=remove_captain_team_id)
            user.captain_of_teams.remove(team)
        if add_captain_team_id:
            team = Team.objects.get(id=add_captain_team_id)
            user.captain_of_teams.add(team)

        return response


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


@reverse_js
class UserRoleView(drf_views.APIView):
    """
    change the users current role
    """
    def get(self, request, *args, **kwargs):
        user = request.user
        role_key = user_cache_key(user)

        if not user.is_anonymous():
            role = request.session.get(role_key)
            if not user.is_commissioner:
                request.session[role_key] = ROLES['player']
            elif not role:
                request.session[role_key] = ROLES['commissioner']

        return Response(
            status=status.HTTP_200_OK,
            data={
                'role': request.session.get(role_key)
            }
        )

    def post(self, request, *args, **kwargs):
        role = request.data.get('role')
        if role:
            request.session[user_cache_key(request.user)] = ROLES[role]
        return Response(
            status=status.HTTP_200_OK,
            data={
                'role': role,
            }
        )
