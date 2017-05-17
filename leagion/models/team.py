from django.db import models

from leagion.models import User

#model data
class Team(models.Model):
    name = models.CharField(max_length=255)
    players = models.ManyToManyField(User, related_name="teams")
    season = models.ForeignKey("Season", related_name="teams")

    def __str__(self):
        return "Team: {name}".format(name=self.name)

    def __repr__(self):
        return "<%s>" % str(self).encode("utf-8")
