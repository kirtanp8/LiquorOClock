from django.db.models import fields
from rest_framework import serializers

from recipes.models import Recipe


class SavedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = '__all__'
