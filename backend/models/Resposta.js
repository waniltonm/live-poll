import mongoose from 'mongoose';

const RespostaSchema = new mongoose.Schema({
  texto: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Resposta = mongoose.model('Resposta', RespostaSchema);
export default Resposta;