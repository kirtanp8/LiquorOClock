from django.core.exceptions import PermissionDenied
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticated
from .models import Review
from .serializers.common import ReviewSerializer


class ReviewListView(APIView):

    permission_classes = (IsAuthenticated, )

    def post(self, request):
        request.data['owner'] = request.user.id
        review_to_add = ReviewSerializer(data=request.data)
        if review_to_add.is_valid():
            review_to_add.save()
            return Response(review_to_add.data, status=status.HTTP_201_CREATED)
        return Response(review_to_add.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class ReviewDetailView(APIView):

    permission_classes = (IsAuthenticated, )

    def get_review(self, pk):
        try:
            review = Review.objects.get(pk=pk)
            return review
        except Review.DoesNotExist:
            raise NotFound(detail="Review Does Not Exist")

    def delete(self, request, pk):
        review_to_delete = self.get_review(pk=pk)
        if review_to_delete.owner != request.user:
            raise PermissionDenied(detail="Unauthorized")
        review_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk):
        review_to_update = self.get_Review(pk=pk)
        updated_review = ReviewSerializer(
            review_to_update, data=request.data)
        if updated_review.is_valid():
            updated_review.save()
            return Response(updated_review.data, status=status.HTTP_202_ACCEPTED)
        return Response(updated_review.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
