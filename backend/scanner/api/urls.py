from django.urls import path, include
from . import views


urlpatterns = [
    path('', views.get_routes),
    path('token/', include('api.auth.urls')),
    path('registration', views.create_user),
]