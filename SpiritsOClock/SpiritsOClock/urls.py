from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/reviews/', include('reviews.urls')),
    path('api/recipes/', include('recipes.urls')),
    path('api/auth/', include('jwt_auth.urls'))
]
