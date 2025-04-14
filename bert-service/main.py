from fastapi import FastAPI

import inference

app = FastAPI()
model, tokenizer = inference.load_model_and_tokenizer()


@app.post("/extract_features")
async def extract_features(query: str):
    return inference.extract_shape_features(query, model, tokenizer)
