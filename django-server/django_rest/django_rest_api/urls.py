from rest_framework import routers

from . import views

router = routers.SimpleRouter()
router.register('category', views.CategoryViewSet, basename='category')
router.register('offers', views.OfferViewSet, basename='offers')

urlpatterns = router.urls
