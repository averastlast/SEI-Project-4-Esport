# ##*******
from rest_framework import serializers

from .models import User, Fav_team, Rival_team

class Fav_teamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fav_team
        fields = ('id', 'name', 'user')

class UserSerializer(serializers.ModelSerializer):
    fav_teams = Fav_teamSerializer(many=False, read_only=True)
    class Meta:
        model = User
        fields = ('id', 'name', 'email', 'password', 'fav_team')

class Rival_teamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rival_team
        fields = ('id', 'name', 'fav_team')