from django.core.management.base import BaseCommand, CommandError

from leagion.utils import generate_all

class Command(BaseCommand):
    def handle(self, *args, **options):
        generate_all()
