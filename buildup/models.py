from __future__ import unicode_literals

import re
import json

from django.db import models

#utils
def _pretty(input):
    """
    takes an input string of a number, reverses it up to the floating point
    then every third character, adds a comma
    if the first character (really the last character) is a comma, get rid of it
    reverse it again, join it up with the rest of the number
    """

    result = []
    f_idx = input.find(".") if input.find(".") != -1 else 9999 #float index
    for i, el in enumerate(input[:f_idx][::-1]):
        if i % 3 == 0:
            result.append(",")
        result.append(el)
    if result[0] == ",":
        result = result[1:]
    return "".join(result[::-1]+list(input[f_idx:]))


def match_harv(str):
 return bool(re.match("harve.*_\d*", str))


def build_resources(building_json):
    resources = []
    for building, data in building_json.items():
        for k, v in data.iteritems():
            if match_harv(k):
                resources.append((k, v))

    return resources

value_map = {
        1: 0.1,
        2: 1,
        3: 8,
        4: 25,
        5: 100,
        6: 350,
        7: 800,
        8: 1500,
        9: 4300,
        10: 11000,
        11: 55000,
        }

def get_resources_per_sec(building_json):
    resources = build_resources(building_json)
    total = 0
    for key, count in resources:
        total+= value_map[int(key.split("_")[2])]*count

    return total


#model data
class Player(models.Model):
    username = models.fields.CharField(max_length=16)
    coins = models.fields.FloatField(default=0)

    #for now put the raw json here, we'll want to move this out into 
    # its own building model later, I just don't want to deal with 
    building_json = models.fields.TextField(null=True, blank=True, default="{}")

    def __unicode__(self):
        return u"Player '%s'" % self.username

    def __repr__(self):
        return "<%s>" % unicode(self)

    @property
    def total_building_levels(self):
        buildings = json.loads(self.building_json)
        return sum(map(lambda b: b['building_level'], buildings.values()))

    @property
    def pretty_coins(self):
        return _pretty("%.2f" % self.coins)

    @property
    def cps(self):
        try:
            return _pretty(str(get_resources_per_sec(json.loads(self.building_json))))
        except ValueError as e:
            print e, "this should be because building json is None"
            return _pretty("-1")
