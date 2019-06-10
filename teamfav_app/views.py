from rest_framework import viewsets

##**********

from .serializers import UserSerializer, Fav_teamSerializer, Rival_teamSerializer
from .models import User, Fav_team, Rival_team


class UserView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class Fav_teamView(viewsets.ModelViewSet):
    queryset = Fav_team.objects.all()
    serializer_class = Fav_teamSerializer

class Rival_teamView(viewsets.ModelViewSet):
    queryset = Rival_team.objects.all()
    serializer_class = Rival_teamSerializer