from .common import UserSerializer


class PopulatedUserSerializer(UserSerializer):
    saved = UserSerializer()
