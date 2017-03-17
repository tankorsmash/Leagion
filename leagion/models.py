from __future__ import unicode_literals

import re
import json
import enum

from django.contrib.auth.models import User

from django.db import models

#model data
class Team(models.Model):
    name = models.CharField(max_length=255)
    players = models.ManyToManyField(User, related_name="teams")
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

    NOTE: the home_team and away_team FKs mean you cannot do something simple
    like some_team.matches.all(). TODO We'll want a helper method for that somewhere
    """
    home_team = models.ForeignKey(Team, related_name="home_matches")
    home_points = models.IntegerField(null=True, blank=True, default=0)

    away_team = models.ForeignKey(Team, related_name="away_matches")
    away_points = models.IntegerField(null=True, blank=True, default=0)

    match_datetime = models.DateTimeField()

    location = models.ForeignKey(Location, null=True, blank=True, related_name="matches")

    league = models.ForeignKey(League, null=False, related_name="matches")

    duration_seconds = models.IntegerField(null=True, blank=True, default=0)

    #TODO make a nice enum wrapper
    StatusChoices = (
        (0, "Not Yet Played"),
        (1, "Completed"),
        (2, "Postponed")
    )
    status = models.IntegerField(default=0, choices=StatusChoices)

    #if a match's status was Postponed, match.postponed_to would point to a new match to replace it
    postponed_to = models.OneToOneField("Match", blank=True, null=True, related_name="postponed_from")

    def __unicode__(self):
        return u"Match: {home_team} vs {away_team} at {location}".format(
            home_team=self.home_team.name,
            away_team=self.away_team.name,
            location=self.location.name
        )

    def __repr__(self):
        return "<%s>" % unicode(self).encode("utf-8")

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

