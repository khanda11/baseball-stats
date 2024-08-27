from django.shortcuts import render
from django.http import JsonResponse
import joblib
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
from urllib.parse import unquote  

def predict_future_stats(request):
    stat_category = request.GET.get('stat_category')
    
    if not stat_category:
        return JsonResponse({"error": "Please provide a stat category as a query parameter."}, status=400)
    
    stat_category = unquote(stat_category).strip()
    model_path = f'ml_predictor/models/model_{stat_category}.pkl'
    
    try:
        model = joblib.load(model_path)
    except FileNotFoundError:
        return JsonResponse({"error": f"Model for stat category {stat_category} not found."}, status=404)

    # prepare future data frame for prediction
    current_year = datetime.now().year
    future_years = pd.date_range(start=pd.to_datetime(current_year, format='%Y'), periods=15, freq='Y')
    future_data = pd.DataFrame({'ds': future_years})

    # Predict future stat values
    forecast = model.predict(future_data)
    result = forecast[['ds', 'yhat']].rename(columns={'ds': 'season', 'yhat': 'predicted_stat_value'})
    result['season'] = result['season'].dt.year
    result_dict = result.to_dict(orient='records')

    return JsonResponse(result_dict, safe=False)
