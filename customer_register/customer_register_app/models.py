from django.db import models

class Paciente(models.Model):
    nome = models.CharField(max_length=100)
    cpf = models.CharField(max_length=14)
    data_nascimento = models.DateField()
    estado = models.ForeignKey('Estado', on_delete=models.CASCADE)

    def __str__(self):
        return self.nome

    class Meta:
        verbose_name_plural = 'Pacientes'

class Telefone(models.Model):
    paciente = models.ForeignKey('Paciente', related_name='telefones', on_delete=models.CASCADE)
    telefone_primario = models.CharField(max_length=15)
    telefone_secundario = models.CharField(max_length=15)

    class Meta:
        verbose_name_plural = 'Telefones'

class Estado(models.Model):
    sigla = models.CharField(max_length=2)
    nome_estado = models.CharField(max_length=20)
    
    class Meta:
        verbose_name_plural = 'Estados'
