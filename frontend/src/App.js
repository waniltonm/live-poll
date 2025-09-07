import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TelaApresentacao from './components/TelaApresentacao';
import TelaResposta from './components/TelaResposta';
import TelaConfiguracao from './components/TelaConfiguracao';
import './index.css';

const API_URL = ''; // CORRETO: String vazia para o deploy

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<TelaApresentacao apiUrl={API_URL} />} />
          <Route path="/resposta" element={<TelaResposta apiUrl={API_URL} />} />
          <Route path="/config" element={<TelaConfiguracao apiUrl={API_URL} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;