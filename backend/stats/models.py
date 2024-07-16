from django.db import models

class Team(models.Model):
    id = models.IntegerField(primary_key=True)  # Use MLB team ID as the primary key
    name = models.CharField(max_length=100)
    city = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Player(models.Model):
    id = models.IntegerField(primary_key=True)  # Use MLB player ID as the primary key
    name = models.CharField(max_length=100)
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='players')
    position = models.CharField(max_length=50)
    games_played = models.IntegerField(default=0)
    runs = models.IntegerField(default=0)
    stats = models.JSONField(default=dict)  # Use JSONField for additional dynamic stats
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class Game(models.Model):
    date = models.DateField()
    home_team = models.ForeignKey(Team, related_name='home_games', on_delete=models.CASCADE)
    away_team = models.ForeignKey(Team, related_name='away_games', on_delete=models.CASCADE)
    home_team_score = models.IntegerField(default=0)
    away_team_score = models.IntegerField(default=0)
    stats = models.JSONField(default=dict)

    def __str__(self):
        return f"{self.home_team} vs {self.away_team} on {self.date}"
