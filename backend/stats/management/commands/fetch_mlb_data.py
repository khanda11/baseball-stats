from django.core.management.base import BaseCommand
from stats.fetch_mlb_data import fetch_all_data

class Command(BaseCommand):
    help = 'Fetch MLB data from the StatsAPI and populate the database'

    def handle(self, *args, **kwargs):
        fetch_all_data()
        self.stdout.write(self.style.SUCCESS('Successfully fetched MLB data'))