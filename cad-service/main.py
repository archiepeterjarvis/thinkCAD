from typing import List

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

import generator
import models
import utils

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/generate")
def generate(data: List[models.TokenItem]):
    shape = generator.generate_shape(data)

    if not shape:
        return JSONResponse(content={'error': 'error'}, status_code=404)

    url = utils.save_to_file(shape).split("/", 1)[-1]
    return JSONResponse(content={"url": url})
