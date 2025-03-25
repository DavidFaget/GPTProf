// frontend/src/services/api.js

export async function fetchQuestions({ tema, formacion, dificultad_input }) {
    try {
      const response = await fetch('http://localhost:8000/generate-questions/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tema, formacion, dificultad_input })
      });
  
      if (!response.ok) {
        throw new Error('Error en la llamada a la API');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error al conectar con la API:', error);
      return { error: 'Error en la conexión con el servidor' };
    }
  }
  