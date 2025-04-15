from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

import generator
import utils
from models import GenerateParams

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
def generate(params: GenerateParams):
    shape = generator.generate_shape(params)
    url = utils.save_to_file(shape).split("/", 1)[-1]
    return JSONResponse(content={"url": url})
