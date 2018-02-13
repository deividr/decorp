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
      fase: Joi.string().default(),
      empresa: Joi.string().default(),
      observacoes: Joi.string().default(),
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
      fase: Joi.string().required(),
      empresa: Joi.string().required(),
      observacoes: Joi.string().default(),
    },
    params: {
      propostaId: Joi.string().hex().required()
    }
  },
};
