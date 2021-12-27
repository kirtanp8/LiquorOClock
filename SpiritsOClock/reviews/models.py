from django.db import models


class Review(models.Model):
    title = models.TextField(max_length=100)
    text = models.TextField(max_length=500)
    created = models.DateTimeField(auto_now_add=True)
    star_rating = models.DecimalField(
        max_digits=10, decimal_places=2, default=None)
    # rating = models.IntegerField()
    owner = models.ForeignKey(
        "jwt_auth.User",
        related_name="reviews",
        on_delete=models.CASCADE
    )
    recipe = models.ForeignKey(
        "recipes.Recipe",
        related_name="reviews",
        on_delete=models.CASCADE
    )

    def __str__(self):
        return f"Review: {self.title} - {self.text} - {self.star_rating}/5"
