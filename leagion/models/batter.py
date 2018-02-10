from django.db import models

from leagion.models import User, Roster

class Batter(models.Model):
    index = models.IntegerField(null=True)
    player = models.ForeignKey(User, related_name="+")
    roster = models.ForeignKey(Roster, related_name='batters')

    @classmethod
    def generate_batter(cls, roster, player, index):
        batter = Batter(
            index=index,
            player=player,
            roster=roster
        )

        return batter
