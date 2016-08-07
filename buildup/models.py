from __future__ import unicode_literals

import json

from django.db import models

def _pretty(input):
    result = []
    for i, el in enumerate(input[::-1]):
            if i%3 == 0:
                result.append(",")
            result.append(el)
    return "".join(result[::-1][:-1])

class Player(models.Model):
    username = models.fields.CharField(max_length=16)
    coins = models.fields.BigIntegerField(default=0)

    #for now put the raw json here, we'll want to move this out into 
    # its own building model later, I just don't want to deal with 
    building_json = models.fields.TextField(null=True, blank=True, default="{}")

    @property
    def total_building_levels(self):
        buildings = json.loads(self.building_json)
        return sum(map(lambda b: b['building_level'], buildings.values()))

    @property
    def pretty_coins(self):
        return _pretty(str(self.coins))
