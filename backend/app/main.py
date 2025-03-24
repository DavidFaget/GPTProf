# backend/app/main.py

from fastapi import FastAPI
from api import app  # Se importa la instancia de FastAPI definida en api.py

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("api:app", host="0.0.0.0", port=8000, reload=True)
