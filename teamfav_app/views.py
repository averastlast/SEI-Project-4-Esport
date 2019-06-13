from rest_framework import viewsets

from .serializers import UserSerializer, Fav_TeamSerializer, Rival_TeamSerializer
from .models import User, Fav_Team, Rival_Team


class UserView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class Fav_TeamView(viewsets.ModelViewSet):
    queryset = Fav_Team.objects.all()
    serializer_class = Fav_TeamSerializer

class Rival_TeamView(viewsets.ModelViewSet):
    queryset = Rival_Team.objects.all()
    serializer_class = Rival_TeamSerializer
