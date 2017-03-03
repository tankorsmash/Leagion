from __future__ import unicode_literals

import re
import json

from django.db import models

#model data
class Player(models.Model):

    def __unicode__(self):
        return u"Player"

    def __repr__(self):
        return "<%s>" % unicode(self)
