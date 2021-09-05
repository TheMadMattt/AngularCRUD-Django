from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from . import models
from . import serializers


class CategoryApiView(APIView):

    # 1. List all
    def get(self, request, *args, **kwargs):
        todos = models.Category.objects.all()
        serializer = serializers.CategorySerializer(todos, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # 2. Create
    def post(self, request, *args, **kwargs):
        category = request.data
        serializer = serializers.CategorySerializer(data=category)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class OfferApiView(APIView):

    def get_offer(self, offer_id):
        try:
            return models.Offer.objects.get(id=offer_id)
        except models.Offer.DoesNotExist:
            return None
    # GET
    def get(self, request, offer_id):
        offer_instance = self.get_offer(offer_id)
        if not offer_instance:
            return Response(
                {"res": "Object with todo id does not exists"},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = serializers.OfferSerializer(offer_instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # UPDATE
    def put(self, request, offer_id):
        offer_instance = self.get_offer(offer_id)
        if not offer_instance:
            return Response(
                {"res": "Object with offer id does not exists"},
                status=status.HTTP_400_BAD_REQUEST
            )
        data = {
            'offer': request.data.get('offer'),
        }
        serializer = serializers.OfferSerializer(instance=offer_instance, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # 5. Delete
    def delete(self, request, offer_id, *args, **kwargs):
        offer_instance = self.get_offer(offer_id)
        if not offer_instance:
            return Response(
                {"res": "Object with offer id does not exists"},
                status=status.HTTP_400_BAD_REQUEST
            )
        offer_instance.delete()
        return Response(
            {"res": "Object deleted!"},
            status=status.HTTP_200_OK
        )