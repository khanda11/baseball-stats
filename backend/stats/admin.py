from django.contrib import admin
from .models import StatLeader

@admin.register(StatLeader)
class StatLeaderAdmin(admin.ModelAdmin):
    list_display = ('player_name', 'stat_category', 'stat_value', 'season', 'team')
    search_fields = ('player_name', 'stat_category', 'team')