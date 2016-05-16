from __future__ import unicode_literals

from django.db import models

class Player(models.Model):
    username = models.fields.CharField(max_length=16)
    coins = models.fields.BigIntegerField(default=0)
