from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.authentication import BasicAuthentication
from django.contrib.auth import get_user_model

from rest_auth.views import (
    LoginView as AuthLoginView,
    LogoutView as AuthLogoutView,
    UserDetailsView as AuthUserDetailsView,
    PasswordResetView as AuthPasswordResetView,
    PasswordResetConfirmView as AuthPasswordResetConfirmView,
    PasswordChangeView as AuthPasswordChangeView
)

from rest_auth.registration.views import (
    RegisterView as AuthRegisterView,
    VerifyEmailView as AuthVerifyEmailView
)

from leagion.utils import reverse_js

User = get_user_model()

@reverse_js
class LoginView(AuthLoginView):
    pass

@reverse_js
class LogoutView(AuthLogoutView):
    pass

@reverse_js
class PasswordResetView(AuthPasswordResetView):
    pass

@reverse_js
class PasswordResetConfirmView(AuthPasswordResetConfirmView):
    pass

@reverse_js
class PasswordChangeView(AuthPasswordChangeView):
    pass

@reverse_js
class RegisterView(AuthRegisterView):
    pass

@reverse_js
class VerifyEmailView(AuthVerifyEmailView):
    pass
