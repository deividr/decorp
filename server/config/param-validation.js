import Joi from 'joi';

export default {
  // POST /api/propostas
  createProposta: {
    body: {
      numero: Joi.string().required(),
      descricao: Joi.string().required(),
      dataInicio: Joi.date().default(),
      dataFim: Joi.date().default(),
      qtdeHoras: Joi.number().integer().default(0),
      valorEstimado: Joi.number().precision(2).default(0.0),
      fase: Joi.string().default(),
      empresa: Joi.string().default(),
      observacoes: Joi.string().default(),
      recebimento: Joi.number().integer().required().default(2),
    }
  },

  // UPDATE /api/propostas/:prpstaId
  updateProposta: {
    body: {
      numero: Joi.string().required(),
      descricao: Joi.string().required(),
      dataInicio: Joi.date().default(),
      dataFim: Joi.date().default(),
      qtdeHoras: Joi.number().required(),
      valorEstimado: Joi.number().precision(2).default(0.0),
      fase: Joi.string().required(),
      empresa: Joi.string().required(),
      observacoes: Joi.string().default(),
      recebimento: Joi.number().integer().default(2),
    },
    params: {
      propostaId: Joi.string().hex().required()
    }
  },
  
  // POST /api/notas
  createNota: {
    body: {
      numero: Joi.number().required(),
      empresa: Joi.string().required(),
      dataEmissao: Joi.date().default(),
      dataFatura: Joi.date().default(),
      valor: Joi.number().precision(2).default(0.0),
      proposta: Joi.string().required(),
      faturada: Joi.number().default(0)
    }
  },

  // UPDATE /api/notas/:notaId
  updateNota: {
    body: {
      numero: Joi.number().required(),
      empresa: Joi.string().required(),
      dataEmissao: Joi.date().default(),
      dataFatura: Joi.date().default(),
      valor: Joi.number().precision(2).default(0.0),
      proposta: Joi.string().required(),
      faturada: Joi.number().default(0)
    },
    params: {
      notaId: Joi.string().hex().required()
    }
  },
};
