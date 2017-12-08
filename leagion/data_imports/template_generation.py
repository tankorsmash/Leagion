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


import operator
import functools
from collections import namedtuple

from leagion.models import League, Season, Team

ColumnTemplate = namedtuple("ColumnTemplate", ["id", "attr_name", "displayed_as"])
ColumnData = namedtuple("ColumnData", ["template_id", "data"])

class BaseTemplateGenerator(object):
    model = None

    #list of strings to be made into ColumnTemplates
    # ie [("team_id", "id", "Team ID"), ("team_name", "name", "Name")]
    columns = []
    #order of columns by ids
    # ie ["team_name", "team_id"]
    column_order = []

    def __init__(self):
        #sanity check
        self.sanity_check_columns()

    def sanity_check_columns(self):
        column_ids = [col.id for col in self.columns]
        assert len(self.column_order) == len(column_ids)
        assert sorted(self.column_order) == sorted(column_ids)

    def build_queryset(self):
        return self.model.objects.all()

    def sort_data(self, data):
        """
        note can be ColumnTemplates or raw data, doesn't matter.
        """
        sorted_data = [col for _, col in sorted(zip(self.column_order, data))]
        return data


    @property
    @functools.lru_cache(maxsize=1)
    def row_class(self):
        """
        builds a class type based on the column ids in class.columns
        id RowData("team_name", "team_id")
        """
        sorted_columns = self.sort_data(self.columns)
        return namedtuple(
            "RowData",
            [col.id for col in sorted_columns]
        )

    def next_row(self):
        """
        yields a generator for each row of data
        """
        for instance in self.build_queryset().iterator():
            yield self.build_row(instance)

    def build_row(self, instance):
        column_data = []
        for column_template in self.columns:
            #call custom column getter if possible
            attr_name = column_template.attr_name
            if hasattr(self, "build_"+attr_name):
                col_data = getattr(self, "build_"+attr_name)(instance)
            else:
                col_data = operator.attrgetter(attr_name)(instance)

            column_data.append((
                ColumnData(
                    column_template.id,
                    col_data,
                )
            ))

        RowClass = self.row_class
        return RowClass(*self.sort_data(column_data))


class TeamsTemplateGenerator(BaseTemplateGenerator):
    model = Team
    columns = [
        ColumnTemplate("team_id", "id", "Team ID"),
        ColumnTemplate("team_name", "name", "Name"),
        ColumnTemplate("team_captain_full_name", "captains__full_name", "Captain Names"),
        ColumnTemplate("team_captain_email", "captains__email", "Captain Emails"),
    ]
    column_order = [
        "team_id", "team_name",
        "team_captain_full_name", "team_captain_email"
    ]

    def build_captains__full_name(self, team):
        return ", ".join(cap.full_name for cap in team.captains.all())

    def build_captains__email(self, team):
        return ", ".join(cap.email for cap in team.captains.all())


class ScheduleTemplateGenerator(BaseTemplateGenerator):
    pass
