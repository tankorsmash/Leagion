"""
defines the spec for the data format the user will
be importing into the system

-1 is equivalent to unset scores

DATE       | TIME  | HOME | HOME_SCORE | AWAY | AWAY_SCORE | LOCATION
YYYY/MM/DD | HH:MM | ID   | int        | ID   | int        | ID
"""

import arrow

#NOTE arrow format codes, not the slightly different datetime formats
DATE_FORMAT = "YYYY/MM/DD"
TIME_FORMAT = "HH:mm"

def whole_number_validator(column_data):
    try:
        float(column_data)
        return True
    except ValueError:
        pass
    try:
        import unicodedata
        unicodedata.numeric(column_data)
        return True
    except (TypeError, ValueError):
        pass

    return False

def date_validator(column_data):
    if not isinstance(column_data, str):
        return False

    try:
        date_obj = arrow.get(column_data, DATE_FORMAT)
    except arrow.parser.ParserError:
        return False

    return True

def time_validator(column_data):
    if not isinstance(column_data, str):
        return False

    #special case because arrow ignores the part that doesn't match the string
    # ie 2:30 pm is recognized as 2:30
    if "am" in column_data.lower() or "pm" in column_data.lower():
        return False

    try:
        date_obj = arrow.get(column_data, TIME_FORMAT)
    except arrow.parser.ParserError:
        return False

    return True

def team_validator(column_data):
    return True

def score_validator(column_data):
    return True

def location_validator(column_data):
    return True

# dict so can easily be reordered
COLUMN_FORMATTERS = {
    0: date_validator,
    1: time_validator,
    2: whole_number_validator,
    3: whole_number_validator,
    4: whole_number_validator,
    5: whole_number_validator,
    6: whole_number_validator,
}

def is_row_well_formatted(row):
    for i, col in enumerate(row):
        if not COLUMN_FORMATTERS[i](col):
            return False, i

    return True, None

def validate_rows(rows):
    """
    returns a list of (row idx, col idx) pairs that failed validation
    """

    invalid_row_indices = []
    for i, row in enumerate(rows):
        is_valid, col_id = is_row_well_formatted(row)
        if not is_valid:
            invalid_row_indices.append((i, col_id))

    return invalid_row_indices
