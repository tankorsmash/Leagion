from django.db import models

from address.models import AddressField

class Location(models.Model):
    """
    Using the AddressField purely for the .raw right now.
    There's a ton more functionality to it but that's all we need
    """

    name = models.CharField(max_length=255) #ie Fenway Park
    address = AddressField(blank=True, null=True)

    def __str__(self):
        return "Location: {name}".format(name=self.name)

    def __repr__(self):
        return "<%s>" % str(self).encode("utf-8")

