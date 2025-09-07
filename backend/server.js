import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './routes/api.js';

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB conectado com sucesso.'))
  .catch(err => console.error('FALHA na conexão com MongoDB:', err));

app.use(cors());
app.use(express.json());

// Rota de teste para verificar se o backend está no ar
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: "ok", message: "Backend is running!" });
});

// Rotas da API principal (sem WebSocket para a Vercel)
app.use('/api', apiRoutes(null));

export default app;