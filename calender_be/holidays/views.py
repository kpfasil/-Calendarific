import requests
from django.core.cache import cache
from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.conf import settings

@api_view(['GET'])
def holidays(request):
    country = request.GET.get('country')
    year = request.GET.get('year')
    cache_key = f'holidays_{country}_{year}'

    # Check if data is cached
    cached_data = cache.get(cache_key)
    if cached_data:
        return Response(cached_data)

    # Fetch data from Calendarific API
    url = f'https://calendarific.com/api/v2/holidays?api_key={settings.CALENDARIFIC_API_KEY}&country={country}&year={year}'
    print(url)
    response = requests.get(url)
    data = response.json()

    # Cache the data for 24 hours
    cache.set(cache_key, data, timeout=86400)

    return Response(data)

@api_view(['GET'])
def search_holidays(request):
    query = request.GET.get('query')
    country = request.GET.get('country')
    year = request.GET.get('year')
    cache_key = f'holidays_{country}_{year}'

    cached_data = cache.get(cache_key)
    if not cached_data:
        return Response({'error': 'Data not found'}, status=404)

    filtered_holidays = [holiday for holiday in cached_data['response']['holidays'] if query.lower() in holiday['name'].lower()]
    return Response(filtered_holidays)