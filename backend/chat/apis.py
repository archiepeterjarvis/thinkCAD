from rest_framework.response import Response
from rest_framework.views import APIView

from chat.services.bert import extract_features
from chat.services.cad import generate_model


class GenerateModelApi(APIView):
    def post(self, request):
        query = request.data.get("query")

        if not query:
            return Response({"error": "No query provided"})

        extracted_features = extract_features(query)
        url = generate_model(extracted_features)

        return Response(url)
