from django.db import models


class StatPrediction(models.Model):
    player_name = models.CharField(max_length=100)
    stat_category = models.CharField(max_length=100)
    predicted_stat_value = models.FloatField()
    season = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.player_name} - {self.stat_category} ({self.season})"