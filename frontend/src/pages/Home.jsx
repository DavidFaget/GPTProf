// frontend/src/pages/Home.js

import React, { useState } from 'react';
import { fetchQuestions } from '../services/api';

function Home() {
  const [tema, setTema] = useState('');
  const [formacion, setFormacion] = useState('');
  const [dificultad, setDificultad] = useState(1);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await fetchQuestions({ tema, formacion, dificultad_input: parseInt(dificultad) });
    setResult(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tema"
          value={tema}
          onChange={(e) => setTema(e.target.value)}
        />
        <input
          type="text"
          placeholder="Formación"
          value={formacion}
          onChange={(e) => setFormacion(e.target.value)}
        />
        <select value={dificultad} onChange={(e) => setDificultad(e.target.value)}>
          <option value="1">Fácil</option>
          <option value="2">Media</option>
          <option value="3">Difícil</option>
        </select>
        <button type="submit">Generar Preguntas</button>
      </form>
      {result && (
        <div>
          <h2>Resultado:</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default Home;
