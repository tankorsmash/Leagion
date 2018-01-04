"""
takes a list of rows, checks if they're valid match rows,
then creates or updates existing rows
"""

import arrow
from operator import itemgetter

from leagion.models import Match, Team, Location

from leagion.data_imports.import_validation import (
    get_invalid_rows, DATE_FORMAT, TIME_FORMAT,
    NEW_MATCH_ID,
)

def update_match_from_data(match, row):
    #TODO make a named tuple for this or something, using hardcoded indices is
    # awful

    #TODO fix the horrible datetime parsing
    date = row[0]
    time = row[1]
    datetime = arrow.get(date+" "+time, DATE_FORMAT+" "+TIME_FORMAT)

    match.match_datetime = datetime.format("YYYY-MM-DD HH:MMZ") #simple django-default-like minus milliseconds

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


def build_match_from_row(row):
    match = Match()
    return update_match_from_data(match, row)

def update_matches_from_pairs(match_data):
    """ takes (match_id, data) pairs """

    match_data.sort(key=itemgetter(0))

    match_ids = list(map(lambda p: p[0], match_data))

    matches = Match.objects.filter(id__in=match_ids).order_by("id")
    #TODO bulk update this so we dont call save so many times
    for match in matches:
        for mid, row_data in match_data:
            if mid == match.id:
                match = update_match_from_data(match, row_data)
                match.save()

                #remove so next iteration is faster
                match_data.remove((mid, row_data))

                break



def build_matches_from_rows(rows):
    #list of Match objects to be bulk_created
    unsaved_matches = []

    #list of match id to match data pairs
    matches_to_update = []

    for i, row in enumerate(rows):
        match_id = row[8]

        #create unsaved Matches
        if match_id == NEW_MATCH_ID:
            unsaved_match = build_match_from_row(row)
            unsaved_matches.append(unsaved_match)
        #otherwise update later
        else:
            matches_to_update.append((
                match_id, row
            ))

    #update the matches
    update_matches_from_pairs(matches_to_update)


    return unsaved_matches


def import_matches_from_rows(rows):
    #assure no invalid data is used
    if get_invalid_rows(rows):
        return []

    #list of Match objects to be bulk_created
    unsaved_matches = build_matches_from_rows(rows)
    Match.objects.bulk_create(unsaved_matches)



