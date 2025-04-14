import requests
from django.conf import settings


def generate_model(shape: str, size: str, unit: str) -> str:
    url = f"{settings.CAD_SERVICE_URL}/generate"
    payload = {
        "shape": shape,
        "size": size,
        "unit": unit,
    }
    response = requests.post(url, json=payload)
    response.raise_for_status()

    return response.json()
