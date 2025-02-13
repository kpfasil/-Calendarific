
import requests
from django.core.cache import cache
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework import serializers, pagination
from django.conf import settings

class HolidaySerializer(serializers.Serializer):
    name = serializers.CharField()
    date = serializers.DictField()
    description = serializers.CharField()

class HolidayPagination(pagination.PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

class HolidaysListView(ListAPIView):
    serializer_class = HolidaySerializer
    pagination_class = HolidayPagination

    def get_queryset(self):
        country = self.request.GET.get('country')
        year = self.request.GET.get('year')
        cache_key = f'holidays_{country}_{year}'
        
        cached_data = cache.get(cache_key)
        if cached_data:
            return cached_data.get('response', {}).get('holidays', [])

        url = f'https://calendarific.com/api/v2/holidays?api_key={settings.CALENDARIFIC_API_KEY}&country={country}&year={year}'
        response = requests.get(url)

        try:
            data = response.json()
            holidays = data.get('response', {}).get('holidays', [])
            if isinstance(holidays, list):
                cache.set(cache_key, data, timeout=86400)
                return data
        except (ValueError, AttributeError, TypeError):
            pass
        
        return []

# class SearchHolidaysListView(ListAPIView):
#     serializer_class = HolidaySerializer
#     pagination_class = HolidayPagination

#     def get_queryset(self):
#         query = self.request.GET.get('query', '').lower()
#         country = self.request.GET.get('country')
#         year = self.request.GET.get('year')
#         cache_key = f'holidays_{country}_{year}'

#         cached_data = cache.get(cache_key)
#         if not cached_data:
#             return []

#         return [holiday for holiday in cached_data['response']['holidays'] if query in holiday['name'].lower()]
