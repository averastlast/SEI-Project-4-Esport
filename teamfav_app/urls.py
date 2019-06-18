
# **************
from django.urls import path, include
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register('users', views.UserView)
router.register('fav_teams', views.Fav_TeamView)
#router.register('rival_teams', views.Rival_TeamView)
router.register('owteams', views.OWTeamView)
#OWTeams


urlpatterns = [
    path('', include(router.urls)),
    path('teams/', views.teams_list)
]