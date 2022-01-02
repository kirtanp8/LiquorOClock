from django.db import models
from django.db.models.deletion import CASCADE
# Create your models here.


class Recipe(models.Model):
    name = models.CharField(max_length=200, default=None)
    prep_time = models.CharField(max_length=200, default=None)
    difficulty = models.CharField(max_length=200, default=None)
    description = models.CharField(max_length=2000, default=None)
    kcal = models.IntegerField()
    fat = models.DecimalField(
        max_digits=10, decimal_places=2, default=None)
    saturates = models.DecimalField(
        max_digits=10, decimal_places=2, default=None)
    carbs = models.DecimalField(
        max_digits=10, decimal_places=2, default=None)
    sugars = models.DecimalField(
        max_digits=10, decimal_places=2, default=None)
    fibre = models.DecimalField(
        max_digits=10, decimal_places=2, default=None)
    protein = models.DecimalField(
        max_digits=10, decimal_places=2, default=None)
    salt = models.DecimalField(
        max_digits=10, decimal_places=2, default=None)
    ingredients_one = models.CharField(max_length=100, default=None)
    ingredients_two = models.CharField(
        max_length=100, default=None, blank=True)
    ingredients_three = models.CharField(
        max_length=100, default=None, blank=True)
    ingredients_four = models.CharField(
        max_length=100, default=None, blank=True)
    ingredients_five = models.CharField(
        max_length=100, default=None, blank=True)
    instructions_one = models.CharField(
        max_length=300, default=None)
    instructions_two = models.CharField(
        max_length=300, default=None, blank=True)
    instructions_three = models.CharField(
        max_length=300, default=None, blank=True)
    instructions_four = models.CharField(
        max_length=300, default=None, blank=True)
    instructions_five = models.CharField(
        max_length=300, default=None, blank=True)
    potential_price = models.DecimalField(
        max_digits=10, decimal_places=2, default=None)
    picture = models.CharField(max_length=500, default=None)
    owner = models.ForeignKey(
        'jwt_auth.User',
        related_name='recipes',
        on_delete=models.CASCADE,
        blank=True
    )
