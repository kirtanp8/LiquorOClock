from jwt_auth.saved_serializer import SavedSerializer
from .common import UserSerializer
from rest_framework import serializers


class PopulatedUserSerializer(UserSerializer):
    saved = SavedSerializer(many=True)
