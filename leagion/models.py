import re
import json
import enum

from django.db import models

from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser, PermissionsMixin
    )

class Timestamped(models.Model):
    """ Abstract base class for models which have created and updated timestamps """
    created_at = models.DateTimeField(auto_now_add=True, editable=False, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, editable=False, null=True, blank=True)

    class Meta:
        abstract = True

    def __str__(self):
        return self.__repr__()

    def __repr__(self):
        val = self.id

        if hasattr(self, 'name'):
            val = self.name

        if hasattr(self, 'full_name'):
            val = self.full_name

        return '{}: {}'.format(self.__class__.__name__, val)

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
        user = self.create_user(email,
            password=password,
            first_name=first_name,
            last_name=last_name,
        )
        user.is_admin = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

class User(AbstractBaseUser, PermissionsMixin, Timestamped):

    email = models.EmailField(verbose_name='email address', max_length=255, unique=True,)
    first_name = models.CharField(max_length=254, blank=True, null=True)
    last_name = models.CharField(max_length=254, blank=True, null=True)

    is_active = models.BooleanField(default=True)

    # Permissions
    is_staff = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)

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

    def __unicode__(self):
        return self.email

#model data
class Team(models.Model):
    name = models.CharField(max_length=255)
    players = models.ManyToManyField(User, related_name="teams")
    league = models.ForeignKey("League", related_name="teams")

    def __unicode__(self):
        return "Team: {name}".format(name=self.name)

    def __repr__(self):
        return "<%s>" % str(self).encode("utf-8")


class League(models.Model):
    name = models.CharField(max_length=255)

    def __unicode__(self):
        return "League: {name}".format(name=self.name)

    def __repr__(self):
        return "<%s>" % str(self).encode("utf-8")


class Location(models.Model):
    """
    figure out more details later, like address, weather? etc
    """

    name = models.CharField(max_length=255) #ie Fenway Park

    def __unicode__(self):
        return "Location: {name}".format(name=self.name)

    def __repr__(self):
        return "<%s>" % str(self).encode("utf-8")


class Match(models.Model):
    """
    should this be a MatchRecord? not all games are played or rescheduled

    NOTE: the home_team and away_team FKs mean you cannot do something simple
    like some_team.matches.all(). TODO We'll want a helper method for that somewhere
    """
    #TODO make a nice enum wrapper
    StatusChoices = (
        (0, "Not Yet Played"),
        (1, "Completed"),
        (2, "Postponed")
    )

    home_team = models.ForeignKey(Team, related_name="home_matches")
    home_points = models.IntegerField(null=True, blank=True, default=0)

    away_team = models.ForeignKey(Team, related_name="away_matches")
    away_points = models.IntegerField(null=True, blank=True, default=0)

    match_datetime = models.DateTimeField()

    location = models.ForeignKey(Location, null=True, blank=True, related_name="matches")

    league = models.ForeignKey(League, null=False, related_name="matches")

    duration_seconds = models.IntegerField(null=True, blank=True, default=0)

    status = models.IntegerField(default=0, choices=StatusChoices)

    #if a match's status was Postponed, match.postponed_to would point to a new match to replace it
    postponed_to = models.OneToOneField("Match", blank=True, null=True, related_name="postponed_from")

    def __unicode__(self):
        return "Match: {}".format(
            self.pretty_name
        )

    @property
    def pretty_name(self):
        return "{home_team} vs {away_team} at {location}".format(
            home_team=self.home_team.name,
            away_team=self.away_team.name,
            location=self.location.name
        )

    def __repr__(self):
        return "<%s>" % str(self).encode("utf-8")

    @property
    def is_home_win(self):
        return self.home_points > self.away_points

    @property
    def is_away_win(self):
        return self.home_points < self.away_points

    @property
    def is_draw(self):
        return self.home_points == self.away_points

    def get_winning_team(self):
        winning_team = None

        if self.is_home_win:
            winning_team = self.home_team
        if self.is_away_win:
            winning_team = self.away_team

        return winning_team

    def get_status_for_team(self, team):
        status = "W"
        winning_team = self.get_winning_team()
        if winning_team != team:
            status = "L"
            if self.is_draw:
                status = "-"

        return status


class Roster(models.Model):
    team = models.ForeignKey(Team, related_name="+")
    players = models.ManyToManyField(User, related_name="+")

    match = models.ForeignKey(Match, related_name="rosters")
