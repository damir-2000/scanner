from django.urls import path, include
from . import views


urlpatterns = [
    path('', views.get_routes),
    path('token/', include('api.auth.urls')),
    path('registration', views.create_user),
    path('group_list', views.group_list_view),
    path('attendance_list', views.attendance_list_view),
]