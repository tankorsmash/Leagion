from django.db import models

from leagion.models import Team, Roster, Location, Season

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
    home_roster = models.ForeignKey(Roster, null=True, blank=True, related_name="home_rosters")

    away_team = models.ForeignKey(Team, related_name="away_matches")
    away_points = models.IntegerField(null=True, blank=True, default=0)
    away_roster = models.ForeignKey(Roster, null=True, blank=True, related_name="away_rosters")

    match_datetime = models.DateTimeField()

    location = models.ForeignKey(Location, null=True, blank=True, related_name="matches")

    season = models.ForeignKey(Season, null=False, related_name="matches")

    duration_seconds = models.IntegerField(null=True, blank=True, default=0)

    status = models.IntegerField(default=0, choices=StatusChoices)

    #if a match's status was Postponed, match.postponed_to would point to a new match to replace it
    postponed_to = models.OneToOneField("Match", blank=True, null=True, related_name="postponed_from")

    def __str__(self):
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

    @property
    def date(self):
        return self.match_datetime.date()

    @property
    def time(self):
        return self.match_datetime.time()

    @property
    def pretty_date(self):
        return self.match_datetime.strftime('%A, %b %d, %Y')

    @property
    def pretty_time(self):
        return self.match_datetime.strftime('%I:%M %p')

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

    @property
    def completed(self):
        return self.home_points is not None and self.away_points is not None

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
