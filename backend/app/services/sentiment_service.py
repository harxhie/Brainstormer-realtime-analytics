from transformers import pipeline

# Load model once (important)
sentiment_pipeline = pipeline(
    "sentiment-analysis",
    model="finiteautomata/bertweet-base-sentiment-analysis"
)



def predict_sentiment(text: str):
    result = sentiment_pipeline(text)[0]

    label = result["label"]

    # Model outputs:
    # POS, NEG, NEU
    if label == "POS":
        return "Positive"
    elif label == "NEG":
        return "Negative"
    else:
        return "Neutral"

