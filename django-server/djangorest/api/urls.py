from django.urls import path
from .views import CategoryApiView, OfferApiView

urlpatterns = [
    path('category', CategoryApiView.as_view()),
    path('offer/', OfferApiView.as_view()),
    path('offer/<int:offer_id>/', OfferApiView.as_view())
]
