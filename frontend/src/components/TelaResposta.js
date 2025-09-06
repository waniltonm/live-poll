import React, { useState } from 'react';

function TelaResposta({ apiUrl }) {
  const [texto, setTexto] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!texto.trim()) return;

    try {
      const response = await fetch(`${apiUrl}/api/resposta`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texto }),
      });

      const data = await response.json();
      
      if(response.ok) {
        setMensagem(data.message);
        setTexto('');
        setTimeout(() => setMensagem(''), 3000); // Limpa a mensagem após 3 segundos
      } else {
        setMensagem(data.message || 'Ocorreu um erro.');
      }
    } catch (error) {
      setMensagem('Erro ao conectar com o servidor.');
    }
  };

  return (
    <div className="resposta-container">
      <h1>Envie sua Resposta</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <textarea
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder="Digite sua resposta aqui..."
            required
          />
        </div>
        <button type="submit">Enviar</button>
      </form>
      {mensagem && <p className="confirmation-message">{mensagem}</p>}
    </div>
  );
}

export default TelaResposta;