from rest_framework.response import Response
from rest_framework.views import APIView

from chat.services.bert import extract_features
from chat.services.cad import generate_model


class GenerateModelApi(APIView):
    def post(self, request):
        query = request.data.get('query')

        if not query:
            return Response({'error': 'No query provided'})

        extracted_features = extract_features(query)

        print(extracted_features)

        shape = extracted_features.get("shape")
        size = extracted_features.get("size")
        unit = extracted_features.get("unit")
        module = extracted_features.get("module")
        teeth = extracted_features.get("teeth")
        gear_height = extracted_features.get("gear_height")
        hole_diameter = 2

        if not shape or not size or not unit:
            return Response({'error': 'Something went wrong'})

        url = generate_model(shape, size, unit, module, teeth, gear_height, hole_diameter)

        return Response(url)
