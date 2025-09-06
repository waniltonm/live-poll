import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Importação dos componentes de cada tela
import TelaApresentacao from './components/TelaApresentacao';
import TelaResposta from './components/TelaResposta';
import TelaConfiguracao from './components/TelaConfiguracao';

// Importação do CSS principal
import './index.css';



// URL base do seu servidor backend.
// Agora é um caminho relativo para funcionar com os rewrites da Vercel.
const API_URL = '/api'; // Mude de 'http://localhost:5000' para '/api'

function App() {
  return (
    <Router>
      <div className="container">
        {/* O componente <Routes> gerencia qual rota será exibida */}
        <Routes>
          {/* Rota para a Tela de Apresentação (página inicial) */}
          <Route 
            path="/" 
            element={<TelaApresentacao apiUrl={API_URL} />} 
          />

          {/* Rota para a Tela de Resposta (acessada via QR Code) */}
          <Route 
            path="/resposta" 
            element={<TelaResposta apiUrl={API_URL} />} 
          />

          {/* Rota para a Tela de Configuração (painel do apresentador) */}
          <Route 
            path="/config" 
            element={<TelaConfiguracao apiUrl={API_URL} />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;