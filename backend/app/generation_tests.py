# backend/app/openai_service.py

from openai import OpenAI
import json
import os

def generate_questions(tema, formacion, dificultad_input):
    #os.environ["OPENAI_API_KEY"] = ""
    
    # Validar la longitud de tema
    if len(tema) > 100:
        return {"error": "El tema debe tener menos de 100 caracteres."}
    
    # Mapear la dificultad numérica a cadena
    dificultad_map = {1: "fácil", 2: "media", 3: "difícil"}
    dificultad = dificultad_map[dificultad_input]
    
    # Mensajes del sistema y usuario
    system_message = (
        "Eres un examinador experto. Genera 10 preguntas de opción múltiple, cada una con 4 opciones, "
        "la respuesta correcta (letra) y una breve explicación. Utiliza la función generate_test_questions para "
        "devolver el resultado en formato JSON según el esquema definido."
    )
    prompt_message = (
        f"Las preguntas son para un estudiante de {formacion}, asegúrate de que el nivel sea adecuado. "
        f"Quiero dificultad {dificultad} sobre {tema}."
    )
    
    # Esquema para la llamada a función
    functions = [
        {
            "name": "generate_test_questions",
            "description": "Genera 10 preguntas tipo test con opciones, solución y breve explicación.",
            "parameters": {
                "type": "object",
                "properties": {
                    "questions": {
                        "type": "array",
                        "minItems": 10,
                        "maxItems": 10,
                        "items": {
                            "type": "object",
                            "properties": {
                                "pregunta": {
                                    "type": "string",
                                    "description": "Texto de la pregunta"
                                },
                                "opciones": {
                                    "type": "array",
                                    "items": {"type": "string"},
                                    "minItems": 4,
                                    "maxItems": 4,
                                    "description": "Lista de 4 opciones de respuesta"
                                },
                                "solucion": {
                                    "type": "string",
                                    "description": "La letra (por ejemplo, 'A') de la opción correcta"
                                },
                                "explicacion": {
                                    "type": "string",
                                    "description": "Breve explicación de la respuesta correcta"
                                }
                            },
                            "required": ["pregunta", "opciones", "solucion", "explicacion"]
                        }
                    }
                },
                "required": ["questions"]
            }
        }
    ]
    
    # Obtener la API key desde la variable de entorno
    openai_api_key = os.getenv("OPENAI_API_KEY")
    if not openai_api_key:
        return {"error": "No se encontró la clave API. Por favor, configura la variable de entorno OPENAI_API_KEY."}
    
    # Instanciar el cliente de OpenAI
    client = OpenAI(api_key=openai_api_key)
    
    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini-2024-07-18",
            messages=[
                {"role": "system", "content": system_message},
                {"role": "user", "content": prompt_message}
            ],
            functions=functions,
            function_call={"name": "generate_test_questions"},
            temperature=0.7
        )
        
        function_call = response.choices[0].message.function_call
        if function_call and function_call.arguments:
            arguments = function_call.arguments
            data = json.loads(arguments)
            return data
        else:
            return {"error": "No se recibió llamada a función."}
    except Exception as e:
        return {"error": str(e)}
