from models import GenerateParams
import cadquery as cq

def generate_shape(params: GenerateParams) -> cq.Workplane:
    size = float(params.size)

    if params.shape == "square":
        return cq.Workplane("XY").box(size, size, size)

    raise NotImplementedError("Shape not supported")