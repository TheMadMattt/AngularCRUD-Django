from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from . import models
from . import serializers


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = models.Category.objects.all()
    serializer_class = serializers.CategorySerializer
    ordering_fields = ['name']

    # 1. GET all categories
    def list(self, request, **kwargs):
        ordering = self.request.query_params.get('ordering')
        category = self.get_queryset()
        if ordering:
            category = category.order_by(ordering)
        serializer = self.serializer_class(category, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # 2. POST category
    def create(self, request, **kwargs):
        category = request.data
        serializer = self.serializer_class(data=category)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_406_NOT_ACCEPTABLE)

    # 3. DELETE category
    def destroy(self, request, **kwargs):
        category = self.get_object()
        if category:
            category.delete()
            return Response('Object deleted.', status=status.HTTP_200_OK)
        return Response('Object not found.', status=status.HTTP_404_NOT_FOUND)

    # 4. PUT category
    def update(self, request, *args, **kwargs):
        category = self.get_object()
        if category:
            serializer = serializers.CategorySerializer(instance=category, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response("Object with category id does not exists", status=status.HTTP_400_BAD_REQUEST)


class OfferViewSet(viewsets.ModelViewSet):
    queryset = models.Offer.objects.all()
    serializer_class = serializers.OfferSerializer

    # 1. GET all or GET all filtered by category (query param)
    def list(self, request, **kwargs):
        category_id = self.request.query_params.get('category')
        if category_id:
            category_id = map(int, category_id.split(','))
            offers = self.queryset.filter(category__in=category_id)
            serializer = serializers.OfferReadSerializer(offers, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        offers = self.get_queryset()
        serializer = serializers.OfferReadSerializer(offers, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # 2. GET offer with category object
    def retrieve(self, request, pk):
        offer = self.get_object()
        if offer:
            serializer = serializers.OfferReadSerializer(offer)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response("Object with offer id does not exists", status=status.HTTP_400_BAD_REQUEST)

    # 3. POST offer
    def create(self, request, **kwargs):
        offer = request.data
        serializer = self.serializer_class(data=offer)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # 4. DELETE offer
    def destroy(self, request, **kwargs):
        offer = self.get_object()
        if offer:
            offer.delete()
            return Response('Object deleted.', status=status.HTTP_200_OK)
        return Response('Object not found.', status=status.HTTP_404_NOT_FOUND)

    # 5. UPDATE offer
    def update(self, request, *args, **kwargs):
        offer = self.get_object()
        if offer:
            serializer = self.serializer_class(instance=offer, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response("Object with offer id does not exists", status=status.HTTP_400_BAD_REQUEST)
