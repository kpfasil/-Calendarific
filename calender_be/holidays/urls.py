from django.urls import path
from .views import HolidaysListView

urlpatterns = [
    path('holidays/', HolidaysListView.as_view(),name='holidays-list'),
    # path('holidays/search/', SearchHolidaysListView.as_view(), name='search-holidays'),
]