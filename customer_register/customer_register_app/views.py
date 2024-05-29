from rest_framework import generics
from .models import Paciente, Estado
from .serializers import PacienteSerializer, EstadoSerializer

class PacienteBaseView(generics.GenericAPIView):
    queryset = Paciente.objects.all()
    serializer_class = PacienteSerializer

class ListarPacientes(PacienteBaseView, generics.ListAPIView):
    pass

class CriarPacientes(PacienteBaseView, generics.CreateAPIView):
    pass

class EditarPacientes(PacienteBaseView, generics.RetrieveUpdateAPIView):
    pass

class ExcluirPacientes(PacienteBaseView, generics.DestroyAPIView):
    pass

class EstadoListView(generics.ListAPIView):
    queryset = Estado.objects.all()
    serializer_class = EstadoSerializer

class EstadoCreateView(generics.CreateAPIView):
    queryset = Estado.objects.all()
    serializer_class = EstadoSerializer

class EstadoDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Estado.objects.all()
    serializer_class = EstadoSerializer