import requests
from django.conf import settings


def extract_features(query: str) -> dict:
    url = f"{settings.BERT_SERVICE_URL}/extract_features?query={query}"
    payload = {
        "query": query,
    }
    response = requests.post(url, json=payload)
    return response.json()
