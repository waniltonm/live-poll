import express from 'express';
import { getConfig, updateConfig } from '../controllers/configController.js';
import { createResposta, exportRespostas } from '../controllers/respostaController.js';

const router = express.Router();

export default (io) => {
  // Rotas de Configuração
  router.get('/config', getConfig);
  router.post('/config', updateConfig);
  
  // Rotas de Resposta
  router.post('/resposta', (req, res) => createResposta(req, res, io));
  router.get('/respostas/export', exportRespostas);

  return router;
};