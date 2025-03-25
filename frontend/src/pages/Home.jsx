import React, { useState } from 'react';
import { fetchQuestions } from '../services/api';

const letterMap = ['A', 'B', 'C', 'D'];

function Question({ question, index, onAnswer }) {
  const [selected, setSelected] = useState(null);

  const handleSelect = (optionIndex) => {
    setSelected(optionIndex);
    const isCorrect = letterMap[optionIndex] === question.solucion;
    onAnswer(index, isCorrect);
  };

  return (
    <div 
      className="question" 
      style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '16px',
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}
    >
      <h3 style={{ marginBottom: '12px' }}>
        {index + 1}. {question.pregunta}
      </h3>
      <div 
        className="options" 
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          margin: '12px 0'
        }}
      >
        {question.opciones.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleSelect(idx)}
            style={{
              padding: '8px 12px',
              borderRadius: '4px',
              border: '1px solid #007BFF',
              backgroundColor: selected === idx ? '#007BFF' : '#fff',
              color: selected === idx ? '#fff' : '#007BFF',
              cursor: 'pointer',
              transition: 'background-color 0.3s, color 0.3s'
            }}
          >
            {option}
          </button>
        ))}
      </div>
      {selected !== null && (
        <div 
          className="result" 
          style={{
            marginTop: '12px',
            padding: '8px',
            backgroundColor: '#f9f9f9',
            borderRadius: '4px'
          }}
        >
          {letterMap[selected] === question.solucion ? (
            <p style={{ color: 'green', margin: '4px 0' }}>¡Correcto!</p>
          ) : (
            <p style={{ color: 'red', margin: '4px 0' }}>
              Incorrecto. La respuesta correcta es {question.solucion}.
            </p>
          )}
          <p style={{ margin: '4px 0' }}>{question.explicacion}</p>
        </div>
      )}
    </div>
  );
}

function Home() {
  const [tema, setTema] = useState('');
  const [formacion, setFormacion] = useState('');
  const [dificultad, setDificultad] = useState(1);
  const [result, setResult] = useState(null);
  const [answers, setAnswers] = useState({}); // To track correctness of each answer
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await fetchQuestions({ tema, formacion, dificultad_input: parseInt(dificultad) });
    setResult(data);
    setAnswers({}); // Reset answers when a new quiz is generated
    setQuizSubmitted(false); // Reset quiz submission status
  };

  const handleAnswer = (questionIndex, isCorrect) => {
    setAnswers(prevAnswers => ({ ...prevAnswers, [questionIndex]: isCorrect }));
  };

  const totalQuestions = result && result.questions ? result.questions.length : 0;
  const correctCount = Object.values(answers).filter(Boolean).length;

  return (
    <div 
      className="home-container" 
      style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        background: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)',
        minHeight: '100vh'
      }}
    >
      <form onSubmit={handleSubmit} style={{ marginBottom: '24px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        <input
          type="text"
          placeholder="Tema"
          value={tema}
          onChange={(e) => setTema(e.target.value)}
          style={{ padding: '8px', flex: '1' }}
        />
        <input
          type="text"
          placeholder="Formación"
          value={formacion}
          onChange={(e) => setFormacion(e.target.value)}
          style={{ padding: '8px', flex: '1' }}
        />
        <select 
          value={dificultad} 
          onChange={(e) => setDificultad(e.target.value)} 
          style={{ padding: '8px' }}
        >
          <option value="1">Fácil</option>
          <option value="2">Media</option>
          <option value="3">Difícil</option>
        </select>
        <button 
          type="submit" 
          style={{
            padding: '8px 16px', 
            cursor: 'pointer',
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            transition: 'background-color 0.3s'
          }}
        >
          Generar Preguntas
        </button>
      </form>
      {result && result.questions && (
        <div className="results">
          <h2>Resultado:</h2>
          {result.questions.map((q, idx) => (
            <Question key={idx} question={q} index={idx} onAnswer={handleAnswer} />
          ))}
          {!quizSubmitted && (
            <div style={{ textAlign: 'center', marginTop: '24px' }}>
              <button 
                onClick={() => setQuizSubmitted(true)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#28a745',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s'
                }}
              >
                Enviar Quiz
              </button>
            </div>
          )}
          {quizSubmitted && (
            <div 
              style={{
                marginTop: '24px',
                padding: '16px',
                backgroundColor: '#fff',
                border: '1px solid #ccc',
                borderRadius: '8px',
                textAlign: 'center',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              <h3>Calificación Final</h3>
              <p>
                {correctCount} de {totalQuestions} correctas
              </p>
            </div>
          )}
        </div>
      )}
      <footer style={{ textAlign: 'center', marginTop: '40px', color: '#555' }}>
        <p>© 2025 Quiz App Mark</p>
      </footer>
    </div>
  );
}

export default Home;
