import faker
import humanize

from leagion.models import User, Team, League, Match, Roster

def generate_users(count, team=None):
    f = faker.Faker()

    for i in xrange(count):
        print "generating user", i+1, "of", count
        user = User.objects.create(
            username=f.user_name(),
            email=f.email(),
            first_name=f.first_name(),
            last_name=f.last_name(),
            password=f.password()
        )

        if team:
            team.players.add(user)

def generate_league(name=None, teams_count=5, players_in_team_count=15):
    print "generating league"
    if name is None:
        f = faker.Faker()
        name = f.company()+" League"
    league = League.objects.create(name=name)

    print "generating teams for league"
    generate_teams(league, teams_count, players_in_team_count)

    return league


def generate_teams(league, team_count, players_count):
    f = faker.Faker()
    for i in xrange(team_count):
        team = Team.objects.create(
            name=f.street_name(),
            league=league
        )
        print "generating players for team", i+1, "of", team_count
        generate_users(players_count, team)
