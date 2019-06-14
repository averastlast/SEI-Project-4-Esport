from rest_framework import viewsets
from django.http import HttpRequest, HttpResponse

from .serializers import UserSerializer, Fav_TeamSerializer, Rival_TeamSerializer, OWTeamSerializer
from .models import User, Fav_Team, Rival_Team, OWTeam
from .pandaAPI import pandaTeams 


class UserView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class Fav_TeamView(viewsets.ModelViewSet):
    queryset = Fav_Team.objects.all()
    serializer_class = Fav_TeamSerializer

class Rival_TeamView(viewsets.ModelViewSet):
    queryset = Rival_Team.objects.all()
    serializer_class = Rival_TeamSerializer

class OWTeamView(viewsets.ModelViewSet):
    # queryset = pandaTeams
    queryset = OWTeam.objects.all()
    serializer_class = OWTeamSerializer

#OWTEAMS

def teams_list(request):
    teams = pandaTeams
    return HttpResponse(teams)