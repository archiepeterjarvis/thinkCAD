import torch
from transformers import AutoTokenizer, AutoModelForTokenClassification

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")


def load_model(model_path: str = "./model"):
    """
    Load the pretrained model
    :param model_path: Path to the pretrained model (default: ./model)
    :return: The model (eval and moved to device) and tokenizer
    """
    tokenizer = AutoTokenizer.from_pretrained(model_path)
    model = AutoModelForTokenClassification.from_pretrained(model_path)

    model.to(device)
    model.eval()

    return model, tokenizer


def predict(text: str, model, tokenizer):
    """
    Predict text using a trained model
    :param text: Text to be predicted
    :param model: The trained model
    :param tokenizer: The tokenizer
    :return: A list of predictions
    """
    encoded_text = tokenizer(
        text,
        return_tensors="pt",
        return_offsets_mapping=True,
        padding=True,
        truncation=True,
    )
    offset_mapping = encoded_text.pop("offset_mapping")

    for key in encoded_text:
        encoded_text[key] = encoded_text[key].to(model.device)

    with torch.no_grad():
        outputs = model(**encoded_text)
        predictions = torch.argmax(outputs.logits, dim=2)

    id2label = model.config.id2label
    predicted_labels = [id2label[prediction.item()] for prediction in predictions[0]]

    tokens = tokenizer.convert_ids_to_tokens(encoded_text["input_ids"][0])

    token_predictions = []
    for token, label, offset in zip(tokens, predicted_labels, offset_mapping[0]):
        if offset[0] == offset[1]:
            continue
        token_predictions.append((token, label))

    word_predictions = []
    current_word = ""
    current_label = None

    for token, label in token_predictions:
        if token.startswith("##"):
            current_word += token[2:]
        else:
            if current_word:
                word_predictions.append((current_word, current_label))
            current_word = token
            current_label = label

    if current_word:
        word_predictions.append((current_word, current_label))

    return word_predictions


def extract_and_group_entities(predictions):
    entities = []
    current_entity = {"type": None, "tokens": []}

    for token, label in predictions:
        if label.startswith("U-"):
            entity_type = label[2:]
            entities.append({"type": entity_type, "tokens": [token]})

        elif label.startswith("B-"):
            entity_type = "GROUP"
            current_entity["type"] = entity_type
            current_entity["tokens"].append({
                "name": label[2:],
                "value": token,
            })
        elif label.startswith("I-") and current_entity["type"]:
            current_entity["tokens"].append({
                "name": label[2:],
                "value": token,
            })
        elif label.startswith("L-") and current_entity["type"]:
            current_entity["tokens"].append({
                "name": label[2:],
                "value": token,
            })
            entities.append(current_entity)
            current_entity = {"type": None, "tokens": []}

    return entities

if __name__ == "__main__":
    model, tokenizer = load_model()

    query = "A helical gear with 8 teeth with 46.2 cm radius"

    predictions = predict(query, model, tokenizer)

    print(predictions)

    entities = extract_and_group_entities(predictions)

    print(entities)
