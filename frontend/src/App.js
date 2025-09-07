import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Importação dos componentes de cada tela
import TelaApresentacao from './components/TelaApresentacao'; //
import TelaResposta from './components/TelaResposta'; //
import TelaConfiguracao from './components/TelaConfiguracao'; //

// Importação do CSS principal
import './index.css'; //

// CORREÇÃO AQUI: A URL base agora é vazia para o deploy.
// As chamadas nos componentes já incluem o '/api'.
const API_URL = '';

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