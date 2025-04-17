import os
import uuid
from typing import List, Dict, Union

import cadquery as cq
import trimesh

import models

EXPORT_PATH = "./static/models/"
os.makedirs(EXPORT_PATH, exist_ok=True)


def save_to_file(generated: cq.Workplane) -> str:
    filename = uuid.uuid4().hex
    stl_filepath = os.path.join(EXPORT_PATH, f"{filename}.stl")
    glb_filepath = os.path.join(EXPORT_PATH, f"{filename}.glb")

    print(f"[INFO] Exporting STL to: {stl_filepath}")
    cq.exporters.export(generated, stl_filepath)

    if not os.path.exists(stl_filepath):
        raise FileNotFoundError(f"[ERROR] STL file not created: {stl_filepath}")

    print(f"[INFO] Loading STL into Trimesh...")
    mesh = trimesh.load_mesh(stl_filepath)

    print(f"[INFO] Exporting GLB to: {glb_filepath}")
    mesh.export(glb_filepath)

    if not os.path.exists(glb_filepath):
        raise FileNotFoundError(f"[ERROR] GLB file not created: {glb_filepath}")

    print(f"[SUCCESS] GLB created at: {glb_filepath}")
    return glb_filepath


def extract_dimensions(tokens: List[models.TokenItem]) -> Dict[str, Dict[str, Union[str, float]]]:
    dimensions = {}

    for item in tokens:
        if item.type == "GROUP":
            group_data = {t.name.upper(): t.value for t in item.tokens}
            dimension = group_data.get("DIMENSION")
            if dimension:
                dimensions[dimension.lower()] = {
                    "value": float(group_data.get("VALUE")),
                    "unit": group_data.get("UNIT")
                }

    return dimensions


def extract_shape_and_type(tokens: List[models.TokenItem]) -> Dict[str, str]:
    shape = None
    shape_type = None

    for item in tokens:
        if item.type == "SHAPE":
            shape = item.tokens[0]

    if not shape:
        for item in tokens:
            if item.type == "GROUP":
                group_data = {t.name.upper(): t.value for t in item.tokens}
                shape = group_data.get("SHAPE")
                shape_type = group_data.get("SHAPE_TYPE")

    return {
        "shape": shape,
        "shape_type": shape_type
    }


def extract_gear_teeth(tokens: List[models.TokenItem]) -> int:
    for item in tokens:
        if item.type == "GROUP":
            group_data = {t.name.upper(): t.value for t in item.tokens}
            teeth_count = group_data.get("TEETH-COUNT")
            if teeth_count:
                return int(teeth_count)


def to_mm(value: float, unit: str) -> float:
    """
    Convert a value to mm
    :param value: The value to convert
    :param unit: The unit the value is already in
    :return:
    """
    if unit == "m":
        return value * 1000
    elif unit == "cm":
        return value * 10
    elif unit == "mm":
        return value

    print(f"Warning: {unit} not implemented.")
    return value
