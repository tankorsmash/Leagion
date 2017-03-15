import faker
import pytz
import random
import humanize

from leagion.models import User, Team, League, Match, Roster, Location

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



def generate_locations(location_count=10):
    f = faker.Faker()

    locations = []
    print "generating", location_count, "locations"
    for i in xrange(location_count):
        loc = Location.objects.create(
            name=f.city()
        )
        locations.append(loc)

    return locations


def generate_matches(league, match_count=10):
    f = faker.Faker()

    teams = league.teams.all()

    locations = Location.objects.all()
    if not locations:
        locations = generate_locations()

    matches = []
    for i in xrange(match_count):
        print "generating match", i+1, "of", match_count
        home_team, away_team = random.sample(teams, 2)

        home_points = f.random_number(1)
        away_points = f.random_number(1)

        match_datetime = f.date_time_this_year(tzinfo=pytz.timezone("EST"))
        location = random.choice(locations)
        duration_seconds = f.random_int(10, 60*60*4) #10s to 4hrs

        match = Match.objects.create(
            home_team=home_team,
            home_points=home_points,
            away_team=away_team,
            away_points=away_points,
            match_datetime=match_datetime,
            location=location,
            duration_seconds=duration_seconds,
        )

        matches.append(match)

    return matches



