import os
import uuid

from django.db import models
from django.conf import settings
from phonenumber_field.modelfields import PhoneNumberField

from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser, PermissionsMixin
)

from leagion.models.base import Timestamped


class UserManager(BaseUserManager):

    def create_user(self, email, password=None, first_name=None, last_name=None, **kwargs):
        """
        Creates and saves a User with the given email and password.
        """
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email),
            first_name=first_name,
            last_name=last_name,
            **kwargs
            )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, first_name=None, last_name=None):
        """
        Creates and saves a superuser with the given email and password.
        """
        user = self.create_user(
            email,
            password=password,
            first_name=first_name,
            last_name=last_name,
        )
        user.is_commissioner = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


def get_avatar_path(instance, filename):
    return 'users/{}/avatar/{}.png'.format(instance.id, uuid.uuid4())


class User(AbstractBaseUser, PermissionsMixin, Timestamped):

    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
    )

    first_name = models.CharField(max_length=254, blank=True, null=True)
    last_name = models.CharField(max_length=254, blank=True, null=True)

    default_phonenumber = PhoneNumberField(blank=True)
    alt_phonenumber = PhoneNumberField(blank=True)

    is_active = models.BooleanField(default=True)

    # Permissions
    is_staff = models.BooleanField(default=False)
    # in control of everything
    is_commissioner = models.BooleanField(default=False)
    # can do everything admins can do besides modify admins
    is_moderator = models.BooleanField(default=False)

    avatar = models.ImageField(
        upload_to=get_avatar_path,
        null=True
    )

    @property
    def avatar_url(self):
        if self.avatar:
            return self.avatar.url
        else:
            return os.path.join(
                settings.STATIC_URL, '/static/images/defaults/silouette.png')

    objects = UserManager()

    # sex = models.CharField(max_length=24, null=True)

    USERNAME_FIELD = 'email'

    def get_full_name(self):
        return "{} {}".format(self.first_name, self.last_name)

    def get_short_name(self):
        return self.first_name

    @property
    def full_name(self):
        return self.get_full_name()

    def __str__(self):
        return self.email

    @property
    def status(self):
        if self.is_active:
            return 'Active'
        else:
            return 'Not Active'
