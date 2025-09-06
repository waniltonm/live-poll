import React, { useState, useEffect } from 'react';

function TelaConfiguracao({ apiUrl }) {
  const [form, setForm] = useState({
    pergunta: '',
    respostasVisiveis: 10,
    palavrasProibidas: '',
  });
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    // Carrega a configuração existente ao montar o componente
    const fetchConfig = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/config`);
        const data = await response.json();
        setForm({
          pergunta: data.pergunta,
          respostasVisiveis: data.respostasVisiveis,
          palavrasProibidas: data.palavrasProibidas.join(', '),
        });
      } catch (error) {
        console.error("Erro ao carregar configurações:", error);
      }
    };
    fetchConfig();
  }, [apiUrl]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/config`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        setMensagem('Configurações salvas com sucesso!');
        setTimeout(() => setMensagem(''), 3000);
      } else {
        throw new Error('Falha ao salvar');
      }
    } catch (error) {
      setMensagem('Erro ao salvar as configurações.');
    }
  };

  const handleExport = (format) => {
    window.open(`${apiUrl}/api/respostas/export?format=${format}`, '_blank');
  };

  return (
    <div>
      <h1>Tela de Configuração</h1>
      <div className="form-group">
        <label>Pergunta Principal</label>
        <input
          type="text"
          name="pergunta"
          value={form.pergunta}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Quantidade de Respostas Visíveis</label>
        <input
          type="number"
          name="respostasVisiveis"
          value={form.respostasVisiveis}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Palavras Proibidas (separadas por vírgula)</label>
        <textarea
          name="palavrasProibidas"
          value={form.palavrasProibidas}
          onChange={handleChange}
        />
      </div>
      <button onClick={handleSave}>Salvar Configurações</button>
      {mensagem && <p style={{ color: 'green', marginTop: '10px' }}>{mensagem}</p>}
      
      <div style={{ marginTop: '30px' }}>
          <h2>Exportar Respostas</h2>
          <button onClick={() => handleExport('json')} style={{ marginRight: '10px' }}>
            Exportar para JSON
          </button>
          <button onClick={() => handleExport('csv')}>
            Exportar para CSV
          </button>
      </div>
    </div>
  );
}

export default TelaConfiguracao;