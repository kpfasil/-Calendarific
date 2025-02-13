from django.urls import path
from .views import holidays

urlpatterns = [
    path('holidays/', holidays),
]