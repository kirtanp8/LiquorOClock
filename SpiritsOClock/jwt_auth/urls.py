from django.urls import path
from .views import RegisterView, LoginView, UserProfileDetailView, SavedView, SavedDetailView

urlpatterns = [
    path('user_profile/', UserProfileDetailView.as_view()),
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('saved/', SavedView.as_view()),
    path('saved/<int:pk>/', SavedDetailView.as_view())
]
