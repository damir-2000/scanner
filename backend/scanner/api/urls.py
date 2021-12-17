from django.urls import path, include
from . import views


urlpatterns = [
    path('', views.getRoutes),
    path('token/', include('api.auth.urls'))
]