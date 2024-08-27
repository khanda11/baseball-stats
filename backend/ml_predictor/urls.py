from django.urls import path
from . import views

urlpatterns = [
    path('predict-future-stats/', views.predict_future_stats, name='predict_future_stats'),
]
