from django.db import models

class User(models.Model):
    user_name = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    password = models.CharField(max_length=100)

    def __str__(self):
        return self.user_name

class Fav_Team(models.Model):
    name = models.CharField(max_length=255)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='fav_team')

    def __str__(self):
        return self.name

class Rival_Team(models.Model):
    name = models.CharField(max_length=255)
    fav_team = models.ForeignKey(Fav_Team, on_delete=models.CASCADE, related_name='rival_team')

    def __str__(self):
        return self.name

# DONT USE SONG OR ARTIST IN DB