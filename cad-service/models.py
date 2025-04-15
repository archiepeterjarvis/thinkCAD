from pydantic import BaseModel


class GenerateParams(BaseModel):
    # For basic shapes
    shape: str
    size: str
    unit: str

    # For gears
    module: float
    teeth: float
    gear_height: float
    center_hole_diameter: float
