
# **************
from django.urls import path, include
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register('users', views.UserView)
router.register('fav_teams', views.Fav_teamView)
router.register('rival_teams', views.Rival_teamView)


urlpatterns = [
    path('', include(router.urls))
]