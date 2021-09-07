from rest_framework import serializers
from . import models


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Category
        fields = "__all__"


class OfferSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Offer
        fields = "__all__"


class OfferReadSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Offer
        fields = "__all__"
        depth = 1
