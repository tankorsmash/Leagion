import datetime
from django.db import models
from leagion.models import User


class League(models.Model):
    name = models.CharField(max_length=255)
    commissioner = models.ForeignKey(User, related_name='leagues_commissioned')

    def __str__(self):
        return "League: {name}".format(name=self.name)

    def __repr__(self):
        return "<%s>" % str(self).encode("utf-8")

    @property
    def current_season(self):
        today = datetime.datetime.now().date()
        return self.seasons.filter(
            start_date__lte=today,
            end_date__gte=today
        ).first()

    @property
    def past_seasons(self):
        today = datetime.datetime.now().date()
        return self.seasons.filter(
            end_date__lt=today
        )

    @property
    def future_seasons(self):
        today = datetime.datetime.now().date()
        return self.seasons.filter(
            start_date__gt=today
        )
