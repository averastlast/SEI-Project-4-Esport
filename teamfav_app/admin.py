from django.contrib import admin

# ****
from .models import User, Fav_team, Rival_team
admin.site.register([User, Fav_team, Rival_team])