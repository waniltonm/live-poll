import mongoose from 'mongoose';

const ConfigSchema = new mongoose.Schema({
  // Usaremos um ID estático para garantir que haja apenas um documento de configuração
  singleton: {
    type: String,
    default: 'main_config',
    unique: true,
  },
  pergunta: {
    type: String,
    default: 'Qual é a sua pergunta?',
  },
  respostasVisiveis: {
    type: Number,
    default: 10,
  },
  palavrasProibidas: {
    type: [String],
    default: [],
  },
});

const Config = mongoose.model('Config', ConfigSchema);
export default Config;