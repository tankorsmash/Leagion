from django.db import models
from django.db.models import Q
from .user import User


class Season(models.Model):
    start_date = models.DateField()
    end_date = models.DateField()
    # name = models.CharField(max_length=255, null=True, blank=True)
    league = models.ForeignKey("League", related_name="seasons")

    def __str__(self):
        return "Season: {}-{}".format(self.start_date, self.end_date)

    def __repr__(self):
        return "<%s>" % str(self).encode("utf-8")

    @property
    def pretty_name(self):
        return "{}: {}".format(self.league.name, self.pretty_date)

    @property
    def league_name(self):
        return self.league.name

    @property
    def pretty_date(self):
        return "{start_date} - {end_date}".format(
            start_date=self.start_date.strftime('%b, %Y'),
            end_date=self.end_date.strftime('%b, %Y'),
        )

    @property
    def matches_completed_count(self):
        return self.matches.filter(
            ~Q(home_points=None) &
            ~Q(away_points=None)
        ).count()

    @property
    def players(self):
        teams = self.teams.all()
        return User.objects.filter(teams__in=teams).distinct()
