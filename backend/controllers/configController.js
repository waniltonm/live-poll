import Config from '../models/Config.js';

// Busca ou cria a configuração principal
export const getConfig = async (req, res) => {
  try {
    let config = await Config.findOne({ singleton: 'main_config' });
    if (!config) {
      config = await Config.create({});
    }
    res.json(config);
  } catch (err) {
    res.status(500).json({ message: 'Erro no servidor' });
  }
};

// Atualiza a configuração
export const updateConfig = async (req, res) => {
  try {
    const { pergunta, respostasVisiveis, palavrasProibidas } = req.body;

    const palavrasArray = palavrasProibidas
      .split(',')
      .map(p => p.trim().toLowerCase())
      .filter(p => p); // Remove entradas vazias

    const updatedConfig = await Config.findOneAndUpdate(
      { singleton: 'main_config' },
      { pergunta, respostasVisiveis, palavrasProibidas: palavrasArray },
      { new: true, upsert: true } // Cria se não existir
    );
    res.json(updatedConfig);
  } catch (err) {
    res.status(500).json({ message: 'Erro no servidor' });
  }
};