from django.contrib import admin

# ****
from .models import User, Fav_Team, Rival_Team
admin.site.register([User, Fav_Team, Rival_Team])