import pytz
import faker
import random
import datetime

from leagion.models import User, Team, League, Match, Roster, Location

def generate_users(count, team=None):
    f = faker.Faker()

    existing_usernames = list(User.objects.all().values_list("username", flat=True))

    new_users = []
    for i in range(count):
        #ensure unique username
        username = f.user_name()
        while username in existing_usernames:
            username = f.user_name()

        user = User(
            username=username,
            email=f.email(),
            first_name=f.first_name(),
            last_name=f.last_name(),
            password=f.password()
        )
        new_users.append(user)

    User.objects.bulk_create(new_users)

    #get the new users from the database so that they've got ids
    created_users = User.objects.filter(username__in=[u.username for u in new_users])

    if team:
        team.players.add(*created_users)

    return created_users



def generate_league(name=None, teams_count=5, players_in_team_count=15):
    print("generating league")
    if name is None:
        f = faker.Faker()
        name = f.company()+" League"
    league = League.objects.create(name=name)

    print("generating teams for league")
    generate_teams(league, teams_count, players_in_team_count)

    return league

def generate_teams(league, team_count, players_count):
    f = faker.Faker()
    for i in range(team_count):
        team = Team.objects.create(
            name=f.street_name(),
            league=league
        )
        print(("generating players for team", i+1, "of", team_count))
        generate_users(players_count, team)



def generate_locations(location_count=10):
    f = faker.Faker()

    locations = []
    print(("generating", location_count, "locations"))
    for i in range(location_count):
        loc = Location.objects.create(
            name=f.city()
        )
        locations.append(loc)

    return locations

def generate_roster(team, match):
    f = faker.Faker()
    roster = Roster.objects.create(
        team=team,
        match=match,
    )
    players=random.sample(
        list(team.players.all()),
        f.random_int(10, team.players.count())
    )

    roster.players.add(*players)

    return roster

def generate_match(league, home_team, away_team, location, postponed_match=None):
    f = faker.Faker()

    home_points = f.random_number(1)
    away_points = f.random_number(1)

    if postponed_match is None:
        match_datetime = f.date_time_this_year(tzinfo=pytz.timezone("EST"))
    else:
        match_datetime = postponed_match.match_datetime + datetime.timedelta(days=7)
        home_team, away_team = postponed_match.home_team, postponed_match.away_team

    duration_seconds = f.random_int(10, 60*60*4) #10s to 4hrs

    match = Match.objects.create(
        home_team=home_team,
        home_points=home_points,
        away_team=away_team,
        away_points=away_points,
        match_datetime=match_datetime,
        location=location,
        duration_seconds=duration_seconds,
        league=league
    )

    if postponed_match is not None:
        match.postposted_from = postponed_match
        match.save()
        postponed_match.save() #related instance needs to get saved too

    generate_roster(home_team, match)
    generate_roster(away_team, match)

    return match

def generate_matches(league, match_count=10):
    teams = list(league.teams.all())

    locations = Location.objects.all()
    if not locations:
        locations = generate_locations()

    matches = []
    for i in range(match_count):
        print(("generating match", i+1, "of", match_count))
        home_team, away_team = random.sample(teams, 2)
        location = random.choice(locations)

        match = generate_match(league, home_team=home_team, away_team=away_team, location=location, postponed_match=None)
        matches.append(match)

        # should_postpone = True
        #1 in 25 chance its a postponed game
        should_postpone = random.randint(0, 25) == 0
        if should_postpone:
            print(("generating postponed match for ", i+1, "of", match_count))
            match.status = 2 #Match.StatusChoices.Postponed once we get that going
            match.save()

            new_location = random.choice(locations)

            new_match = generate_match(league, home_team=None, away_team=None, location=new_location, postponed_match=match)
            match.refresh_from_db()

            matches.append(new_match)

    return matches


def generate_all():
    league = generate_league()
    matches = generate_matches(league)
