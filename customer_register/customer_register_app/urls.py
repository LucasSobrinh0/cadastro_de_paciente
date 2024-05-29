from django.urls import path
from . import views

urlpatterns = [
    path('pacientes/', views.ListarPacientes.as_view(), name='listar-pacientes'),
    path('pacientes/novo/', views.CriarPacientes.as_view(), name='criar-paciente'),
    path('pacientes/<int:pk>/', views.EditarPacientes.as_view(), name='editar-paciente'),
    path('pacientes/<int:pk>/excluir/', views.ExcluirPacientes.as_view(), name='excluir-paciente'),
    path('estados/', views.EstadoListView.as_view(), name='listar-estados'),
    path('estados/novo/', views.EstadoCreateView.as_view(), name='criar-estado'),
    path('estados/<int:pk>/', views.EstadoDetailView.as_view(), name='detalhar-estado'),
]
