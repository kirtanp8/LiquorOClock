from .models import Recipe
from .serializers.common import RecipeSerializer
from .serializers.populated import PopulatedRecipeSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from jwt_auth.serializers.populated import PopulatedUserSerializer


class RecipeListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get(self, request):
        recipes = Recipe.objects.all()
        serialized_recipes = PopulatedRecipeSerializer(recipes, many=True)
        return Response(serialized_recipes.data, status=status.HTTP_200_OK)

    def post(self, request):
        request.data['owner'] = request.user.id
        recipe_added = RecipeSerializer(data=request.data)
        if recipe_added.is_valid():
            recipe_added.save()
            return Response(recipe_added.data, status=status.HTTP_201_CREATED)
        return Response(recipe_added.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class RecipeDetailView(APIView):

    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get_recipe(self, pk):
        try:
            return Recipe.objects.get(pk=pk)
        except Recipe.DoesNotExist:
            raise NotFound(detail="The Recipe Cannot Be Found")

    def get(self, request, pk):
        recipe = self.get_recipe(pk=pk)
        serialized_recipe = PopulatedRecipeSerializer(recipe)
        return Response(serialized_recipe.data, status=status.HTTP_200_OK)

    def delete(self, request, pk):
        recipe_to_delete = self.get_recipe(pk=pk)
        recipe_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk):
        recipe_to_update = self.get_recipe(pk=pk)
        updated_recipe = RecipeSerializer(recipe_to_update, data=request.data)
        if updated_recipe.is_valid():
            updated_recipe.save()
            return Response(updated_recipe.data, status=status.HTTP_200_OK)
        return Response(updated_recipe.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    def post(self, request, pk):
        try:
            recipe = Recipe.objects.get(id=pk)
            user = request.user
            user.saved.add(recipe)
            saved_item = PopulatedUserSerializer(user)
        except:
            return Response(saved_item.data.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        return Response(saved_item.data, status=status.HTTP_200_OK)
