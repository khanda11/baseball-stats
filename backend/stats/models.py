# stats/models.py

from django.db import models

class StatLeader(models.Model):
    player_id = models.IntegerField(null=True, blank=True)  # Allow null and blank values
    player_name = models.CharField(max_length=100)
    stat_category = models.CharField(max_length=100)
    stat_value = models.FloatField()
    season = models.IntegerField()
    team = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.player_name} - {self.stat_category} ({self.stat_value})"

class Team(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=100)
    city = models.CharField(max_length=100)

class Game(models.Model):
    id = models.IntegerField(primary_key=True)
    date = models.DateField()
    home_team = models.ForeignKey(Team, related_name='home_games', on_delete=models.CASCADE)
    away_team = models.ForeignKey(Team, related_name='away_games', on_delete=models.CASCADE)
    home_score = models.IntegerField()
    away_score = models.IntegerField()

class BoxScore(models.Model):
    game = models.ForeignKey(Game, related_name='box_scores', on_delete=models.CASCADE)
    data = models.JSONField()

class Player(models.Model):
    id = models.IntegerField(primary_key=True)
    full_name = models.CharField(max_length=100)
    position = models.CharField(max_length=10, blank=True, null=True)
    team = models.ForeignKey(Team, related_name='players', on_delete=models.CASCADE)
    avg = models.CharField(max_length=10, blank=True, null=True)
    obp = models.CharField(max_length=10, blank=True, null=True)
    ops = models.CharField(max_length=10, blank=True, null=True)
    rbi = models.IntegerField(blank=True, null=True)
    hits = models.IntegerField(blank=True, null=True)
    runs = models.IntegerField(blank=True, null=True)
    at_bats = models.IntegerField(blank=True, null=True)
    doubles = models.IntegerField(blank=True, null=True)
    triples = models.IntegerField(blank=True, null=True)
    home_runs = models.IntegerField(blank=True, null=True)
    left_on_base = models.IntegerField(blank=True, null=True)
    strike_outs = models.IntegerField(blank=True, null=True)
    base_on_balls = models.IntegerField(blank=True, null=True)
    stolen_bases = models.IntegerField(blank=True, null=True)
    era = models.CharField(max_length=10, blank=True, null=True)
    wins = models.IntegerField(blank=True, null=True)
    losses = models.IntegerField(blank=True, null=True)
    holds = models.IntegerField(blank=True, null=True)
    blown_saves = models.IntegerField(blank=True, null=True)
    earned_runs = models.IntegerField(blank=True, null=True)
    innings_pitched = models.CharField(max_length=10, blank=True, null=True)
    number_of_pitches = models.IntegerField(blank=True, null=True)