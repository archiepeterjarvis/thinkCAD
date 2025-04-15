import os
import uuid
import cadquery as cq

import trimesh

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
