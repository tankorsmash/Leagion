"""
takes a list of rows, checks if they're valid match rows,
then creates or updates existing rows
"""

from leagion.models import Match, Team, Location

from leagion.data_imports.import_validation import (
    get_invalid_rows
)

def build_match_from_row(row):
    return Match()

def import_matches_from_rows(rows):
    #assure no invalid data is used
    if get_invalid_rows(rows):
        return []

    #list of Match objects to be bulk_created
    unsaved_matches = []
    for i, row in rows:
        unsaved_match = build_match_from_row(row)
        unsaved_matches.append(unsaved_match)


