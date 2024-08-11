from rest_framework import serializers
from .models import StatLeader

class StatLeaderSerializer(serializers.ModelSerializer):
    class Meta:
        model = StatLeader
        fields = '__all__'
