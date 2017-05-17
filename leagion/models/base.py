from django.db import models

class Timestamped(models.Model):
    """ Abstract base class for models which have created and updated timestamps """
    created_at = models.DateTimeField(auto_now_add=True, editable=False, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, editable=False, null=True, blank=True)

    class Meta:
        abstract = True

    def __str__(self):
        return self.__repr__()

    def __repr__(self):
        val = self.id

        if hasattr(self, 'name'):
            val = self.name

        if hasattr(self, 'full_name'):
            val = self.full_name

        return '{}: {}'.format(self.__class__.__name__, val)

