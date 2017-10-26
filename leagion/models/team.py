import os
import uuid
from django.db import models
from django.conf import settings

from leagion.models import User


def get_logo_path(instance, filename):
    return 'teams/{}/logo/{}.png'.format(instance.id, uuid.uuid4())


class Team(models.Model):
    name = models.CharField(max_length=255)
    season = models.ForeignKey("Season", related_name="teams")

    captains = models.ManyToManyField(User, related_name="captain_of_teams")
    players = models.ManyToManyField(User, related_name="teams")

    color = models.CharField(max_length=6, default="196E3D") #store the hex color without '#': FF00FF
    logo = models.ImageField(
        upload_to=get_logo_path,
        null=True
    )

    @property
    def logo_url(self):
        if self.logo:
            return self.logo.url
        else:
            return os.path.join(
                settings.STATIC_URL, '/static/images/defaults/baseball.png')

    def __str__(self):
        return "Team: {name}".format(name=self.name)

    def __repr__(self):
        return "<%s>" % str(self)

    def get_points(self, wins, draws, losses):
        return wins * 2 + draws

    @property
    def win_draw_loss_points(self):
        matches = list(self.home_matches.all()) + list(self.away_matches.all())
        match_statuses = [
            match.get_status_for_team(self)
            for match in matches
            if match.completed
        ]

        def is_status(value):
            return lambda to_test: to_test == value

        wins   = len(list(map(is_status("W"), match_statuses)))
        draws  = len(list(map(is_status("-"), match_statuses)))
        losses = len(list(map(is_status("L"), match_statuses)))

        return {
            'wins': wins,
            'draws': draws,
            'losses': losses,
            'points': self.get_points(wins, draws, losses),
        }
