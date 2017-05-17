from django.db import models

class League(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return "League: {name}".format(name=self.name)

    def __repr__(self):
        return "<%s>" % str(self).encode("utf-8")

