import os

import cadquery as cq
import uuid

EXPORT_PATH = "./static/models/"
os.makedirs(EXPORT_PATH, exist_ok=True)

def save_to_file(generated: cq.Workplane) -> str:
    filename = uuid.uuid4().hex
    filepath = os.path.join(EXPORT_PATH, f"{filename}.step")
    generated.export(filepath)
    return filepath