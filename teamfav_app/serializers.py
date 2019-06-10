# ##*******
from rest_framework import serializers

from .models import User, Fav_team, Rival_team

class Fav_teamSerializer(serializers.ModelSerializer):
    rival_team = Rival_teamSerializer(
        view_name='rival_team-detail',
        many=False, 
        read_only=True
        )
    class Meta:
        model = Fav_team
        fields = ('id', 'name', 'user')

class UserSerializer(serializers.ModelSerializer):
    fav_team = Fav_teamSerializer(
        view_name='fav_team-detail',
        many=False, 
        read_only=True
        )
    class Meta:
        model = User
        fields = ('id', 'user_name', 'email', 'password', 'fav_team')

class Rival_teamSerializer(serializers.ModelSerializer):
    fav_team = Fav_teamSerializer(
        view_name='fav_team-detail',
        many=False, 
        read_only=True
        )
    class Meta:
        model = Rival_team
        fields = ('id', 'name', 'fav_team')