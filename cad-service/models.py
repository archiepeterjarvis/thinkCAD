from pydantic import BaseModel


class GenerateParams(BaseModel):
    shape: str
    size: str
    unit: str
