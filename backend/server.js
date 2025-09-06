import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './routes/api.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Em produção, restrinja para o domínio do seu frontend
    methods: ["GET", "POST"]
  }
});

// Conexão com MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB conectado com sucesso.'))
  .catch(err => console.error('Falha na conexão com MongoDB:', err));

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas da API
app.use('/api', apiRoutes(io));

// Lógica do WebSocket
io.on('connection', (socket) => {
  console.log('Um cliente se conectou:', socket.id);
  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));