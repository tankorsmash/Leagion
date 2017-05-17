from django.db import models

from leagion.models import Team, User

class Roster(models.Model):
    team = models.ForeignKey(Team, related_name="+")
    players = models.ManyToManyField(User, through='Batter')
