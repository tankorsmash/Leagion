"""
The pre-Leagion formats were:

Team Table:

A - Team Number
B - Team Name (Display)
C - Captain (not displayed, not mandatory)
D - Email (not displayed, not mandatory)

Schedule Table:

A - Game Number 
B - Month ID (calendar month number)
C - Day of the Week
D - Date
E - Diamond
F - Home team number
G - Visiting team number
H - Home score (left as "null" until game is played as to not factor into rankings)
I - Visitor Score (left as "null" until game is played as to not factor into rankings)
"""


class BaseTemplateGenerator(object):
    def build_empty_csv(self):
        pass

    def next_row(self):
        """
        yields a generator for each row of data
        """
        pass


class TeamsTemplateGenerator(BaseTemplateGenerator):
    pass


class ScheduleTemplateGenerator(BaseTemplateGenerator):
    pass
