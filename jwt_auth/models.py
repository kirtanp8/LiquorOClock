from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    email = models.CharField(max_length=30, unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    image = models.CharField(max_length=700)
    saved = models.ManyToManyField(
        'recipes.Recipe',
        related_name='users',
        blank=True
    )
