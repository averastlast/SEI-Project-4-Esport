# ##*******
from rest_framework import serializers

from .models import User, Fav_Team, Rival_Team, OWTeam

#Change Start 

class OWTeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = OWTeam
        fields = ('acronym', 'name', 'image_url')

#Change End

class Rival_TeamSerializer(serializers.ModelSerializer):

    class Meta:
        model = Rival_Team
        fields = ('id', 'name', 'fav_team')
        
class Fav_TeamSerializer(serializers.ModelSerializer):
    rival_team = Rival_TeamSerializer(
        many=True, 
        read_only=True
        )

    class Meta:
        model = Fav_Team
        fields = ('id', 'name', 'rival_team', 'user')

class UserSerializer(serializers.ModelSerializer):
    fav_team = Fav_TeamSerializer(
        many=True, 
        read_only=True
        )
    class Meta:
        model = User
        fields = ('id', 'user_name', 'email', 'password', 'fav_team')
