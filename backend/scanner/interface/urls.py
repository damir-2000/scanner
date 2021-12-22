from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.urls import path
from . import views

urlpatterns = [
    path('', views.Index.as_view()),
    path('login', views.Index.as_view()),
    path('logout', views.Index.as_view()),
    path('registration', views.Index.as_view()),
    path('scanner', views.Index.as_view()),
    path('generator', views.Index.as_view()),
]

