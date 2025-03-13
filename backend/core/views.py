from django.shortcuts import render
from django.http import HttpResponse
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Usuario
import gspread
from google.oauth2.service_account import Credentials
from decouple import config
import os
from config.settings import GOOGLE_SHEETS_CREDENTIALS

SCOPES = ["https://www.googleapis.com/auth/spreadsheets", "https://www.googleapis.com/auth/drive"]

def home(request):
    return HttpResponse("Bem-vindo ao site do Professor!")

@csrf_exempt
def cadastrar_usuario(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            usuario = Usuario.objects.create(
                nome = data["nome"],
                email = data["email"],
                estado = data["estado"],
                formacao = data["formacao"],
                whatsapp = data["whatsapp"]
            )
            return JsonResponse({"status": "success", "message": "Usuário cadastrado com sucesso!"}, status=201)
        except Exception as e:
            return JsonResponse({"status": "error", "message": str(e)}, status=400)
    return JsonResponse({"status": "error", "message": "Método inválido"}, status=405)

def listar_usuario(request):
    if request.method == "GET":
        usuarios = Usuario.objects.all().values("id", "nome", "email", "estado", "formacao", "whatsapp", "data_cadastro")
        return JsonResponse(list(usuarios), safe=False, status=200)
    
    return JsonResponse({"status": "error", "message": "Método Inválido"}, status=405)

@csrf_exempt
def deletar_usuario(request, id):
    if request.method == "DELETE":
        try:
            usuario = Usuario.objects.get(id=id)
            usuario.delete()
            return JsonResponse({"status": "success", "message": "Usuário deletado com sucesso!"}, status=200)
        except Usuario.DoesNotExist:
            return JsonResponse({"status": "error", "message": "Usuario não existe."}, status=404)
    
    return JsonResponse({"status": "error", "message": "Método Inválido."}, status=405)

creds = Credentials.from_service_account_info(GOOGLE_SHEETS_CREDENTIALS, scopes=SCOPES)
client = gspread.authorize(creds)

def exportar_dados_sheets(request):
    try:
        sheet = client.open_by_key("13hlMk6C-9V-Mqrc3bg8a4kp8iy7nXt84PU-kHqeTeSs").sheet1

        from .models import Usuario
        usuarios = Usuario.objects.all().values("id", "nome", "email", "estado", "formacao", "whatsapp", "data_cadastro")

        usuarios_formatados = [
            [
                usuario["nome"],
                usuario["email"],
                usuario["estado"],
                usuario["formacao"],
                usuario["whatsapp"],
                usuario["data_cadastro"].strftime("%d/%m/%Y %H:%M:%S")
            ]
            for usuario in usuarios
        ]

        sheet.clear()

        sheet.append_row(["Nome", "E-mail", "Estado", "Formação", "Número WhatsApp", "Data de Cadastro"])

        if usuarios_formatados:
            sheet.append_rows(list(usuarios_formatados))
        
        return JsonResponse({"status": "success", "message": "Dados exportados com sucesso!"}, status=200)
    
    except Exception as e:
        return JsonResponse({"status": "error", "message": str(e)})

