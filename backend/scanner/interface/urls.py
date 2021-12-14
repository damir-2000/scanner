from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.urls import path
from . import views

urlpatterns = [
    path('', views.Index.as_view()),
    path('about', views.Index.as_view())
]

