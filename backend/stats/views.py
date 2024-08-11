from rest_framework import viewsets
from .models import StatLeader
from .serializers import StatLeaderSerializer
from django.http import JsonResponse
from django.views.decorators.http import require_GET
from django.utils.decorators import method_decorator

class StatLeaderViewSet(viewsets.ModelViewSet):
    queryset = StatLeader.objects.all()
    serializer_class = StatLeaderSerializer

from django.http import JsonResponse
from django.views.decorators.http import require_GET
from .models import StatLeader

@require_GET
def get_random_stat_leader(request):
    stat_leader = StatLeader.objects.order_by('?').first()
    data = {
        "id": stat_leader.id,
        "stat_category": stat_leader.stat_category,
        "season": stat_leader.season,
        "team": stat_leader.team,
        "stat_value": stat_leader.stat_value,
        "name": stat_leader.player_name
    }
    return JsonResponse(data)

@require_GET
def check_guess(request):
    player_id = request.GET.get('id')
    guess = request.GET.get('guess')
    
    try:
        player_id = int(player_id)
    except ValueError:
        return JsonResponse({"correct": False, "error": "Invalid player ID format"})
    
    try:
        stat_leader = StatLeader.objects.get(id=player_id)
    except StatLeader.DoesNotExist:
        return JsonResponse({"correct": False, "error": "Player not found"})
    
    is_correct = guess.lower() == stat_leader.player_name.lower()
    return JsonResponse({"correct": is_correct, "player_name": stat_leader.player_name})