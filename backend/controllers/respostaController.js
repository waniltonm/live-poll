// backend/controllers/respostaController.js

import Resposta from '../models/Resposta.js';
import Config from '../models/Config.js';

// Função para filtrar palavras proibidas
const filtrarPalavras = (texto, palavrasProibidas) => {
  let textoFiltrado = texto;
  palavrasProibidas.forEach(palavra => {
    const regex = new RegExp(`\\b${palavra}\\b`, 'gi');
    if (textoFiltrado.match(regex)) {
      textoFiltrado = textoFiltrado.replace(regex, '*'.repeat(palavra.length));
    }
  });
  return textoFiltrado;
};

// VERSÃO ÚNICA E CORRIGIDA da função createResposta
export const createResposta = async (req, res, io) => {
  try {
    const { texto } = req.body;
    if (!texto || texto.trim() === '') {
        return res.status(400).json({ message: 'A resposta não pode estar vazia.' });
    }

    const config = await Config.findOne({ singleton: 'main_config' });
    const palavrasProibidas = config ? config.palavrasProibidas : [];

    const textoFiltrado = filtrarPalavras(texto, palavrasProibidas);

    const novaResposta = new Resposta({ texto: textoFiltrado });
    await novaResposta.save();

    // Emite o evento via WebSocket APENAS se o 'io' existir (importante para Vercel)
    if (io) {
      io.emit('novaResposta', novaResposta);
    }

    res.status(201).json({ message: 'Resposta enviada com sucesso!' });
  } catch (err) {
    console.error(err); // Adiciona um log do erro no servidor para depuração
    res.status(500).json({ message: 'Erro no servidor ao criar resposta.' });
  }
};

// Exporta respostas
export const exportRespostas = async (req, res) => {
    try {
        const respostas = await Resposta.find().sort({ createdAt: -1 });
        const format = req.query.format || 'json';

        if (format === 'csv') {
            let csv = 'texto,createdAt\n';
            respostas.forEach(r => {