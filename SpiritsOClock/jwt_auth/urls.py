from django.urls import path
from .views import RegisterView, LoginView, UserProfileDetailView

urlpatterns = [
    path('user_profile/', UserProfileDetailView.as_view()),
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view())
]
