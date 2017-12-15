from leagion.cache import user_cache_key
from leagion.constants import ROLES


def role_middleware(get_response):
    def middleware(request):
        user = request.user
        role_key = user_cache_key(user)
        if not user.is_anonymous():
            role = request.session.get(role_key)
            if not role:
                if user.teams.count():
                    request.session[role_key] = ROLES['player']
                elif user.leagues_commissioned.count():
                    request.session[role_key] = ROLES['commissioner']

        response = get_response(request)
        return response

    return middleware
