from django.contrib import admin

# ****here OWTeam
from .models import User, Fav_Team, OWTeam
admin.site.register([User, Fav_Team, OWTeam])