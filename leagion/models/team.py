from django.db import models

from leagion.models import User

#model data
class Team(models.Model):
    name = models.CharField(max_length=255)
    players = models.ManyToManyField(User, related_name="teams")
    season = models.ForeignKey("Season", related_name="teams")
    captains = models.ManyToManyField(User, related_name="captain_of_teams")

    def __str__(self):
        return "Team: {name}".format(name=self.name)

    def __repr__(self):
        return "<%s>" % str(self).encode("utf-8")

    def get_points(self, wins, draws, losses):
        return wins * 2 + draws

    @property
    def win_draw_loss_points(self):
        matches = list(self.home_matches.all()) + list(self.away_matches.all())
        match_statuses = [match.get_status_for_team(self) for match in matches if match.completed]

        wins = len([status for status in match_statuses if status == 'W'])
        draws = len([status for status in match_statuses if status == '-'])
        losses = len([status for status in match_statuses if status == 'L'])

        return {
            'wins': wins,
            'draws': draws,
            'losses': losses,
            'points': self.get_points(wins, draws, losses),
        }
