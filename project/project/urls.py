from django.contrib import admin
from django.urls import path
from app.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', ReactView.as_view(), name="anything"),
     path('updateEmployee/', UpdateEmployeeView.as_view(), name="update-employee"),
]
