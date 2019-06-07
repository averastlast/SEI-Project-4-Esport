from django.contrib import admin

# ****
from .models import Artist, Song
admin.site.register([Artist, Song])