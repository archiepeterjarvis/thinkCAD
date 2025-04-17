import requests
from django.conf import settings


def generate_model(data) -> str:
    url = f"{settings.CAD_SERVICE_URL}/generate"
    response = requests.post(url, json=data)
    response.raise_for_status()

    return response.json()
