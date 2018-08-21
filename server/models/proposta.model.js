import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Proposta Schema
 */
const PropostaSchema = new mongoose.Schema({
  numero: {
    type: String,
    required: true
  },
  descricao: {
    type: String,
    required: true
  },
  dataInicio: {
    type: Date,
    default: Date.now
  },
  dataFim: {
    type: Date,
    default: Date.now
  },
  qtdeHoras: {
    type: Number,
    default: 0
  },
  qtdeParcelas: {
    type: Number,
    default: 0
  },
  valorEstimado: {
    type: Number,
    default: 0
  },
  fase: {
    type: String,
    required: true
  },
  empresa: {
    type: String,
    required: true
  },
  observacoes: {
    type: String,
    default: ''
  },
  recebimento: {
    type: Number,
    default: 2
  },
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
PropostaSchema.method({
});

/**
 * Statics
 */
PropostaSchema.statics = {
  /**
   * Get proposta
   * @param {ObjectId} id - The objectId of proposta.
   * @returns {Promise<Proposta, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((proposta) => {
        if (proposta) {
          return proposta;
        }
        const err = new APIError('Proposta inexistente!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      })
      .catch(e => {
        const err = new APIError('Proposta inexistente!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * Listar as propostas por ordem decrescente de número de proposta.
   * @param {number} skip - Numero de propostas a ser ignoradas.
   * @param {number} limit - Máximo de proposta que podem ser retornadas.
   * @returns {Promise<Proposta[]>}
   */
  list({ filter = '', recebimento = '', skip = 0, limit = 50 } = {}) {

    const argumentos = {};

    if (filter) {
      argumentos['$or'] = [
        { 'numero': new RegExp(filter, 'i') },
        { 'descricao': new RegExp(filter, 'i') },
        { 'empresa': new RegExp(filter, 'i') },
        { 'fase': new RegExp(filter, 'i') },
      ];
    }

    if (recebimento) {
      argumentos['recebimento'] = { $in: recebimento.split(',').map(v => parseInt(v, 0)) };
    }
    
    return this.find(argumentos)
      .sort({ numero: +1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  },

  /**
   * Obter o valor total previsto das notas.
   * @returns {Promise<any>} Valor Estimado total das propostas em andamento.
   */
  valorTotalPrevisto() {
    return this.aggregate([
      { $match: { recebimento: { $in: [1, 2] } } },
      { $group: { _id: null, valorTotalPrevisto: { $sum: '$valorEstimado' } } }
    ]).exec();
  }
};

/**
 * @typedef Proposta
 */
export default mongoose.model('Proposta', PropostaSchema);
