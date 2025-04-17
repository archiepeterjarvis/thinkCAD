from typing import List

import cadquery as cq
import cq_gears

import models
from utils import extract_dimensions, to_mm, extract_shape_and_type, extract_all


def generate_shape(data: List[models.TokenItem]) -> cq.Workplane:
    parameters = extract_all(data)

    if shape.lower() in (models.Shapes.CUBE.value, models.Shapes.CUBOID.value):
        x_v, x_u = dimensions["width"]["value"], dimensions["width"]["unit"]
        y_v, y_u = dimensions["height"]["value"], dimensions["height"]["unit"]
        z_v, z_u = dimensions["depth"]["value"], dimensions["depth"]["unit"]

        return cq.Workplane("XY").box(
            to_mm(x_v, x_u),
            to_mm(y_v, y_u),
            to_mm(z_v, z_u),
        )
    elif shape.lower() == "gear":
        teeth_count = extract_gear_teeth(data)

        if shape_type.lower() == "helical":
            gear = cq_gears.SpurGear(module=1.0, teeth_number=teeth_count,
                                     width=to_mm(dimensions["radius"]["value"], dimensions["radius"]["unit"]))
            wp = cq.Workplane("XY").gear(gear)
            return wp

    print(f"[ERROR] {shape} is not a valid shape")
    return None
