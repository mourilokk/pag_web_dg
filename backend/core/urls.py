from django.urls import path
from .views import cadastrar_usuario
from .views import listar_usuario
from .views import deletar_usuario
from .views import exportar_dados_sheets

urlpatterns = [
    path('cadastrar/', cadastrar_usuario, name='cadastrar_usuario'),
    path('usuarios/', listar_usuario, name='listar_usuario'),
    path('usuarios/<int:id>', deletar_usuario, name='deletar_usuario'),
    path('exportar/', exportar_dados_sheets, name='exportar_dados_sheets'),
]