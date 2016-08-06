from __future__ import unicode_literals

from django.db import models

class Player(models.Model):
    username = models.fields.CharField(max_length=16)
    coins = models.fields.BigIntegerField(default=0)

    #for now put the raw json here, we'll want to move this out into 
    # its own building model later, I just don't want to deal with 
    building_json = models.fields.TextField(null=True, blank=True, default="{}")
