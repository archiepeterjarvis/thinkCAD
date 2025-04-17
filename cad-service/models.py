import enum
from typing import Literal, List, Union

from pydantic import BaseModel, Field


class ShapeToken(BaseModel):
    type: Literal['SHAPE']
    tokens: List[str]

class GroupSubToken(BaseModel):
    name: str
    value: str

class GroupToken(BaseModel):
    type: Literal['GROUP']
    tokens: List[GroupSubToken]

TokenItem = Union[ShapeToken, GroupToken]

class Shapes(enum.Enum):
    CUBE = "cube"
    CUBOID = "cuboid"