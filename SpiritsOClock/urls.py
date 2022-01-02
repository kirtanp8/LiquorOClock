from django.contrib import admin
from django.urls import path, include, re_path
from .views import index


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/reviews/', include('reviews.urls')),
    path('api/recipes/', include('recipes.urls')),
    path('api/auth/', include('jwt_auth.urls')),
    re_path(r'^.*$', index)
]
