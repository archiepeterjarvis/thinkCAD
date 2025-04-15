import requests
from django.conf import settings


def generate_model(shape: str, size: str, unit: str, module: float, teeth: float, gear_height: float, center_hole_diameter: float) -> str:
    url = f"{settings.CAD_SERVICE_URL}/generate"
    payload = {
        "shape": shape,
        "size": size,
        "unit": unit,
        "teeth": teeth,
        "gear_height": gear_height,
        "module": module,
        "center_hole_diameter": center_hole_diameter
    }
    response = requests.post(url, json=payload)
    response.raise_for_status()

    return response.json()
