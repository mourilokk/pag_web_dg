from django.db import models

class Usuario(models.Model):
    nome = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    estado = models.CharField(max_length=50)
    formacao = models.CharField(max_length=100)
    whatsapp = models.CharField(max_length=25)
    data_cadastro = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nome