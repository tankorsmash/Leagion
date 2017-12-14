from django.db import models

from address.models import AddressField
from .league import League


class Location(models.Model):
    """
    Using the AddressField purely for the .raw right now.
    There's a ton more functionality to it but that's all we need
    """

    league = models.ForeignKey(League, related_name='locations')
    name = models.CharField(max_length=255)
    address = AddressField(blank=True, null=True)

    def __str__(self):
        return "Location: {name}".format(name=self.name)

    def __repr__(self):
        return "<%s>" % str(self).encode("utf-8")
