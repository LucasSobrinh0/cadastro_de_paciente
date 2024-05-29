from rest_framework import serializers
from .models import Paciente, Telefone, Estado

class TelefoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Telefone
        fields = '__all__'
        extra_kwargs = {
            'paciente': {'read_only': True}
        }

class EstadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estado
        fields = '__all__'

class PacienteSerializer(serializers.ModelSerializer):
    telefones = TelefoneSerializer(many=True)
    estado = serializers.PrimaryKeyRelatedField(queryset=Estado.objects.all(), required=False)

    class Meta:
        model = Paciente
        fields = ('id', 'nome', 'cpf', 'data_nascimento', 'estado', 'telefones')

    def create(self, validated_data):
        telefones_data = validated_data.pop('telefones')
        estado = validated_data.pop('estado', None)
        paciente = Paciente.objects.create(estado=estado, **validated_data)
        for telefone_data in telefones_data:
            Telefone.objects.create(paciente=paciente, **telefone_data)
        return paciente

    def update(self, instance, validated_data):
        telefones_data = validated_data.pop('telefones', None)
        estado = validated_data.pop('estado', None)

        instance.nome = validated_data.get('nome', instance.nome)
        instance.cpf = validated_data.get('cpf', instance.cpf)
        instance.data_nascimento = validated_data.get('data_nascimento', instance.data_nascimento)
        if estado:
            instance.estado = estado
        instance.save()

        if telefones_data:
            instance.telefones.all().delete()
            for telefone_data in telefones_data:
                Telefone.objects.create(paciente=instance, **telefone_data)

        return instance
