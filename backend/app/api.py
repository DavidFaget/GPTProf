# backend/app/api.py

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from generation_tests import generate_questions
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


# Configuración de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ⚠️ En producción, cambia "*" por el dominio del frontend
    allow_credentials=True,
    allow_methods=["*"],  # Permite GET, POST, OPTIONS, etc.
    allow_headers=["*"],  # Permite todos los headers
)
# Modelo de la petición
class QuestionRequest(BaseModel):
    tema: str
    formacion: str
    dificultad_input: int

@app.post("/generate-questions/")
async def generate_questions_endpoint(request: QuestionRequest):
    try:
        response = generate_questions(request.tema, request.formacion, request.dificultad_input)
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
