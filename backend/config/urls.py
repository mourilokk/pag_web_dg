from django.contrib import admin
from django.urls import path, include
from core.views import home
from core.views import listar_usuario

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home),
    path('api/', include('core.urls')),
]
