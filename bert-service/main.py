from fastapi import FastAPI

import inference

app = FastAPI()
model, tokenizer = inference.load_model()


@app.post("/extract_features")
async def extract_features(query: str):
    predictions = inference.predict(text=query, model=model, tokenizer=tokenizer)
    entities = inference.extract_and_group_entities(predictions)
    return entities
