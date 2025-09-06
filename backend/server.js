// backend/server.js

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './routes/api.js';
// ATENÇÃO: Não precisamos mais de 'http' ou 'socket.io' aqui para o deploy na Vercel
// A funcionalidade de tempo real será perdida, veja a nota no final.

dotenv.config();

const app = express();

// Conexão com MongoDB
// A string de conexão será configurada como Variável de Ambiente na Vercel
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB conectado.'))
  .catch(err => console.error('Falha na conexão com MongoDB:', err));

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas da API
// Passamos um 'io' falso ou nulo, já que não teremos mais o WebSocket
const io_placeholder = null; 
app.use('/api', apiRoutes(io_placeholder));

// IMPORTANTE: Exporte o app para a Vercel usar
export default app;

// REMOVA OU COMENTE a parte final que inicia o servidor:
/*
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
*/