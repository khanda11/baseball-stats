from rest_framework import serializers
from .models import Player, Team, Game

class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ['id', 'name', 'team', 'position', 'games_played', 'runs', 'stats', 'last_updated']

class TeamSerializer(serializers.ModelSerializer):
    players = PlayerSerializer(many=True, read_only=True)

    class Meta:
        model = Team
        fields = ['id', 'name', 'city', 'players']

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ['id', 'date', 'home_team', 'away_team', 'home_team_score', 'away_team_score', 'stats']
