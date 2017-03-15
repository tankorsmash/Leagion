from __future__ import unicode_literals

import re
import json

from django.contrib.auth.models import User

from django.db import models

#model data
class Team(models.Model):
    name = models.CharField(max_length=255)
    players = models.ManyToManyField(User)
    league = models.ForeignKey("League", related_name="teams")

    def __unicode__(self):
        return u"Team: {name}".format(name=self.name)

    def __repr__(self):
        return "<%s>" % unicode(self).encode("utf-8")


class League(models.Model):
    name = models.CharField(max_length=255)

    def __unicode__(self):
        return u"League: {name}".format(name=self.name)

    def __repr__(self):
        return "<%s>" % unicode(self).encode("utf-8")


class Location(models.Model):
    """
    figure out more details later, like address, weather? etc
    """

    name = models.CharField(max_length=255) #ie Fenway Park

    def __unicode__(self):
        return u"Location: {name}".format(name=self.name)

    def __repr__(self):
        return "<%s>" % unicode(self).encode("utf-8")


class Match(models.Model):
    """
    should this be a MatchRecord? not all games are played or rescheduled
    """

    home_team = models.ForeignKey(Team, related_name="home_matches") #this'll mean you can do Team.matches.all() and get both home and away games though, maybe there's a better way?
    home_points = models.IntegerField(null=True, blank=True, default=0)

    away_team = models.ForeignKey(Team, related_name="away_matches")
    away_points = models.IntegerField(null=True, blank=True, default=0)

    match_datetime = models.DateTimeField()

    location = models.ForeignKey(Location, null=True, blank=True, related_name="matches")

    league = models.ForeignKey(League, null=False, related_name="matches")

    duration_seconds = models.IntegerField(null=True, blank=True, default=0)

    def __unicode__(self):
        return u"Match: {home_team} vs {away_team} at {location}".format(
            home_team=self.home_team.name,
            away_team=self.away_team.name,
            location=self.location.name
        )

    def __repr__(self):
        return "<%s>" % unicode(self).encode("utf-8")


class Roster(models.Model):
    team = models.ForeignKey(Team, related_name="+")
    players = models.ManyToManyField(User, related_name="+")

    match = models.ForeignKey(Match, related_name="rosters")

