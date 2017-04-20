import pytz
import faker
import random
import datetime

from django.contrib.auth import get_user_model
from django.conf import settings

from leagion.models import (
    Team, League, Match, Roster,
    Location, Season, Batter,
    User
)

User = get_user_model()

viewnames_exposed_js = set()

def reverse_js(view):
    viewnames_exposed_js.add(view)
    return view

def generate_users(count, team=None):
    f = faker.Faker()

    existing_emails = list(User.objects.all().values_list("email", flat=True))

    new_users = []
    for i in range(count):
        #ensure unique email
        email = f.email()
        while email in existing_emails:
            email = f.email()

        user = User(
            email=email,
            first_name=f.first_name(),
            last_name=f.last_name(),
        )
        user.set_password('abc123')
        new_users.append(user)

    User.objects.bulk_create(new_users)

    #get the new users from the database so that they've got ids
    created_users = User.objects.filter(email__in=[u.email for u in new_users])

    if team:
        team.players.add(*created_users)

    return created_users

def generate_league(name=None):
    print("generating league")
    if name is None:
        f = faker.Faker()
        name = f.company()+" League"
    league = League.objects.create(name=name)

    print("generating season for league")
    generate_season(league)

    return league

def generate_season(league, start_date=None, end_date=None, teams_count=5, players_in_team_count=15):
    print("generating season")
    f = faker.Faker()

    if start_date is None:
        start_date = f.date_object()
    if end_date is None:
        end_date = start_date + datetime.timedelta(weeks=32)

    season = Season.objects.create(league=league, start_date=start_date, end_date=end_date)

    print("generating teams for league")
    generate_teams(season, teams_count, players_in_team_count)

    return season

def generate_teams(season, team_count, players_count):
    f = faker.Faker()
    for i in range(team_count):
        team = Team.objects.create(
            name=f.street_name(),
            season=season
        )
        print("generating players for team", i + 1, "of", team_count)
        generate_users(players_count, team)

def generate_locations(location_count=10):
    f = faker.Faker()

    locations = []
    print("generating", location_count, "locations")
    for i in range(location_count):
        loc = Location.objects.create(
            name=f.city()
        )
        locations.append(loc)

    return locations

def generate_batter(roster, player, index):
    f = faker.Faker()
    batter = Batter.objects.create(
        index=index,
        player=player,
        roster=roster
    )

    return batter

def generate_roster(team):
    f = faker.Faker()
    roster = Roster.objects.create(
        team=team,
    )

    player_sample = random.sample(
        list(team.players.all()),
        f.random_int(10, team.players.count())
    )

    for i, player in enumerate(player_sample):
        generate_batter(roster, player, i)

    return roster

def generate_match(season, home_team, away_team, location, postponed_match=None):
    f = faker.Faker()

    #if not postponed:
    if postponed_match is None:
        match_datetime = f.date_time_this_year(tzinfo=pytz.timezone("EST"))
        home_points = f.random_number(1)
        away_points = f.random_number(1)
        duration_seconds = f.random_int(10, 60*60*4) #10s to 4hrs

    #if the match is postponed
    else:
        match_datetime = postponed_match.match_datetime + datetime.timedelta(days=7)
        home_team, away_team = postponed_match.home_team, postponed_match.away_team
        home_points = None
        away_points = None
        duration_seconds = None

    home_roster = generate_roster(home_team)
    away_roster = generate_roster(away_team)

    match = Match.objects.create(
        home_team=home_team,
        home_points=home_points,
        home_roster=home_roster,
        away_team=away_team,
        away_points=away_points,
        away_roster=away_roster,
        match_datetime=match_datetime,
        location=location,
        duration_seconds=duration_seconds,
        season=season
    )

    if postponed_match is not None:
        match.postposted_from = postponed_match
        match.save()
        postponed_match.save() #related instance needs to get saved too

    return match

def generate_matches(season, match_count=10):
    teams = list(season.teams.all())

    locations = Location.objects.all()
    if not locations:
        locations = generate_locations()

    matches = []
    for i in range(match_count):
        print("generating match", i+1, "of", match_count)
        home_team, away_team = random.sample(teams, 2)
        location = random.choice(locations)

        match = generate_match(season, home_team=home_team, away_team=away_team, location=location, postponed_match=None)
        matches.append(match)

        # should_postpone = True
        #1 in 25 chance its a postponed game
        should_postpone = random.randint(0, 5) == 0
        if should_postpone:
            print("generating postponed match for ", i+1, "of", match_count)
            match.status = 2 #Match.StatusChoices.Postponed once we get that going
            match.save()

            new_location = random.choice(locations)

            new_match = generate_match(season, home_team=None, away_team=None, location=new_location, postponed_match=match)
            match.refresh_from_db()

            matches.append(new_match)

    return matches

def generate_superuser():
    try:
        DEFAULT_ADMIN_DATA = settings.DEFAULT_ADMIN_DATA
        superuser = User.objects.create_superuser(
            email=DEFAULT_ADMIN_DATA['email'],
            password=DEFAULT_ADMIN_DATA['password'],
            first_name=DEFAULT_ADMIN_DATA['first_name'],
            last_name=DEFAULT_ADMIN_DATA['last_name'],
        )
        superuser.is_staff = True
        superuser.save()

        print("created superuser", superuser)

    except AttributeError as e:
        print(e)
        print("See note in settings.py about DEFAULT_ADMIN_DATA if you want to autogenerate a staff/superuser")


def generate_all():
    generate_superuser()

    league = generate_league()
    for season in league.seasons.all():
        generate_matches(season)
