import torch
from transformers import AutoTokenizer, BertForTokenClassification

id_to_label = {
    0: "O",
    1: "B-SHAPE",
    2: "B-SIZE",
    3: "B-UNIT"
}

def load_model_and_tokenizer(model_path='./model', device='cuda'):
    model = BertForTokenClassification.from_pretrained(model_path).to(device)
    tokenizer = AutoTokenizer.from_pretrained(model_path)
    return model, tokenizer

def extract_shape_features(text, model, tokenizer, device='cuda'):
    model.eval()  # Evaluation mode

    inputs = tokenizer(text, return_tensors="pt").to(device)

    with torch.no_grad():
        outputs = model(**inputs)
        predictions = torch.argmax(outputs.logits, dim=2)

    predicted_labels = [id_to_label[token_pred.item()] for token_pred in predictions[0]]

    tokens = tokenizer.convert_ids_to_tokens(inputs['input_ids'][0])

    shape, size, unit = None, None, None

    for token, label in zip(tokens, predicted_labels):
        if token in ['[CLS]', '[SEP]', '[PAD]'] or token.startswith('##'):
            continue

        if label == 'B-SHAPE':
            shape = token
        elif label == 'B-SIZE':
            size = token
        elif label == 'B-UNIT':
            unit = token

    return {
        'shape': shape,
        'size': size,
        'unit': unit,
    }


