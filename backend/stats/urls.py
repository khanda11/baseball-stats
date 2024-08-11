from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'stat-leaders', views.StatLeaderViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('random-stat-leader/', views.get_random_stat_leader, name='random-stat-leader'),
    path('check-guess/', views.check_guess, name='check-guess'),
]
