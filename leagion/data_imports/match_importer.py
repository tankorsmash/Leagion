"""
takes a list of rows, checks if they're valid match rows,
then creates or updates existing rows
"""

import arrow

from leagion.models import Match, Team, Location

from leagion.data_imports.import_validation import (
    get_invalid_rows, DATE_FORMAT, TIME_FORMAT
)

def build_match_from_row(row):
    match = Match()

    #TODO make a named tuple for this or something, using hardcoded indices is
    # awful, then also fix the horrible datetime parsing
    date = row[0]
    time = row[1]
    datetime = arrow.get(date+" "+time, DATE_FORMAT+" "+TIME_FORMAT)

    match.match_datetime = datetime.format("YYYY-MM-DD HH:MM") #simple django-default-like minus timezone and milliseconds

    #home team and score
    home_id = row[2]
    home_score = row[3]
    match.home_team_id = home_id
    match.home_points = home_score

    #away team and score
    away_id = row[4]
    away_score = row[5]
    match.away_team_id = away_id
    match.away_points = away_score

    location_id = row[6]
    match.location_id = location_id

    season_id = row[7]
    match.season_id = season_id

    return match

def build_matches_from_rows(rows):
    #list of Match objects to be bulk_created
    unsaved_matches = []
    for i, row in enumerate(rows):
        unsaved_match = build_match_from_row(row)
        unsaved_matches.append(unsaved_match)

    return unsaved_matches


def import_matches_from_rows(rows):
    #assure no invalid data is used
    if get_invalid_rows(rows):
        return []

    #list of Match objects to be bulk_created
    unsaved_matches = build_matches_from_rows(rows)

    Match.objects.bulk_create(unsaved_matches)



