import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { QRCodeSVG } from 'qrcode.react';

function TelaApresentacao({ apiUrl }) {
  const [respostas, setRespostas] = useState([]);
  const [config, setConfig] = useState({ pergunta: 'Carregando...', respostasVisiveis: 10 });
  const urlResposta = `${window.location.origin}/resposta`;

  useEffect(() => {
    // Busca a configuração inicial
    const fetchConfig = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/config`);
        const data = await response.json();
        setConfig(data);
      } catch (error) {
        console.error("Erro ao buscar configuração:", error);
      }
    };
    fetchConfig();

    // Conecta ao WebSocket
    const socket = io(apiUrl);
    socket.on('connect', () => {
      console.log('Conectado ao servidor WebSocket!');
    });

    socket.on('novaResposta', (novaResposta) => {
      setRespostas(prevRespostas => [novaResposta, ...prevRespostas]);
    });

    return () => {
      socket.disconnect(); // Desconecta ao desmontar o componente
    };
  }, [apiUrl]);

  const respostasExibidas = respostas.slice(0, config.respostasVisiveis);

  return (
    <div className="apresentacao-container">
      <h1>{config.pergunta}</h1>
      <div className="qr-code-section">
        <QRCodeSVG value={urlResposta} size={256} />
        <p>Escaneie para responder!</p>
      </div>
      <h2>Respostas Recebidas:</h2>
      <ul className="respostas-list">
        {respostasExibidas.length > 0 ? (
          respostasExibidas.map((resp) => (
            <li key={resp._id}>{resp.texto}</li>
          ))
        ) : (
          <p>Aguardando respostas...</p>
        )}
      </ul>
    </div>
  );
}

export default TelaApresentacao;