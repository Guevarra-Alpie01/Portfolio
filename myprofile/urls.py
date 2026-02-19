from django.contrib import admin
from django.urls import path
from . import views

app_name = 'myprofile'

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home, name='home'),
]