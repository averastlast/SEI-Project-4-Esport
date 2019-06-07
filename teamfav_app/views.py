from rest_framework import viewsets

##**********

from .serializers import ArtistSerializer, SongSerializer
from .models import Artist, Song


class ArtistView(viewsets.ModelViewSet):
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer

class SongView(viewsets.ModelViewSet):
    queryset = Song.objects.all()
    serializer_class = SongSerializer