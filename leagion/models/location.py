from django.db import models

from .league import League


class Location(models.Model):
    """
    Using the AddressField purely for the .raw right now.
    There's a ton more functionality to it but that's all we need
    """

    league = models.ForeignKey(League, related_name='locations')
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255, blank=True, null=True)
    address_latitude = models.DecimalField(max_digits=20, decimal_places=17, blank=True, null=True)
    address_longitude = models.DecimalField(max_digits=20, decimal_places=17, blank=True, null=True)

    def __str__(self):
        return "Location: {name}".format(name=self.name)

    def __repr__(self):
        return "<%s>" % str(self).encode("utf-8")
