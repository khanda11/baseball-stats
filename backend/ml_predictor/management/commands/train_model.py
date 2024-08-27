from django.core.management.base import BaseCommand
from stats.models import StatLeader  # Import your model
import pandas as pd
from prophet import Prophet
import joblib
import os

class Command(BaseCommand):
    help = 'Fetch data from PostgreSQL and train the prediction model for each stat category'

    def handle(self, *args, **kwargs):
        # Fetch data using Django ORM
        queryset = StatLeader.objects.all().values('player_name', 'stat_category', 'stat_value', 'season', 'team')
        data = pd.DataFrame.from_records(queryset)

        # Check if data is fetched correctly
        if data.empty:
            self.stdout.write(self.style.ERROR('No data found for training.'))
            return

        for stat_category in data['stat_category'].unique():
            category_data = data[data['stat_category'] == stat_category]

            # Preparingg data for Prophet
            prophet_data = category_data[['season', 'stat_value']]
            prophet_data = prophet_data.rename(columns={'season': 'ds', 'stat_value': 'y'})
            prophet_data['ds'] = pd.to_datetime(prophet_data['ds'].astype(str) + '-01-01')

            # Initialize and train the Prophet model
            model = Prophet(yearly_seasonality=True, daily_seasonality=False)
            model.fit(prophet_data)

            # Save the trained model to disk
            model_filename = f'ml_predictor/models/model_{stat_category}.pkl'
            os.makedirs(os.path.dirname(model_filename), exist_ok=True)
            joblib.dump(model, model_filename)
            self.stdout.write(self.style.SUCCESS(f"Model training complete for {stat_category} and saved as {model_filename}"))

        self.stdout.write(self.style.SUCCESS('All models trained and saved successfully.'))
