from .common import RecipeSerializer
from reviews.serializers.populated import PopulatedReviewSerializer
from jwt_auth.serializers.common import UserSerializer
from jwt_auth.serializers.populated import PopulatedUserSerializer


class PopulatedRecipeSerializer(RecipeSerializer):
    reviews = PopulatedReviewSerializer(many=True)
    owner = UserSerializer()
