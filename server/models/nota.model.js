import Promise from 'bluebird';
import mongoose, { Schema } from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

var ObjectID = require('mongodb').ObjectID;

/**
 * Nota Schema
 */
const NotaSchema = new mongoose.Schema({
  numero: {
    type: Number,
    required: true
  },
  empresa: {
    type: String,
    required: true
  },
  dataEmissao: {
    type: Date,
    default: Date.now
  },
  dataFatura: {
    type: Date,
    default: Date.now
  },
  valor: {
    type: Number
  },
  proposta: {
    type: Schema.Types.ObjectId,
    ref: 'Proposta',
    required: true
  },
  faturada: {
    type: Number,
    default: 1,
    required: true
  }
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
NotaSchema.method({
});

/**
 * Statics
 */
NotaSchema.statics = {
  /**
   * Get nota
   * @param {ObjectId} id - The objectId of nota.
   * @returns {Promise<Nota, APIError>}
   */
  get(id) {
    return this.findById(id)
      .populate('proposta')
      .exec()
      .then((nota) => {
        if (nota) {
          return nota;
        }
        const err = new APIError('Nota inexistente!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      })
      .catch(e => {
        const err = new APIError('Nota inexistente!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * Listar as notas por ordem decrescente de número de nota.
   * @param {string} filter - Argumentos para pesquisas diversas.
   * @param {string} proposta - Id da proposta que se deseja pesquisar.
   * @param {string} dataInicial - Data inicial em que a nota foi emitida.
   * @param {string} dataFinal - Data final em que a nota foi emitida.
   * @param {number} skip - Numero de notas a ser ignoradas.
   * @param {number} limit - Máximo de nota que podem ser retornadas.
   * @returns {Promise<Nota[]>}
   */
  list({ filter = '', proposta = '', dataInicial = '', dataFinal = '', skip = 0, limit = 50 } = {}) {
    const argumentos = {};

    if (proposta) {
      argumentos['proposta'] = new ObjectID(proposta);
    }

    if (dataInicial && dataFinal) {
      argumentos['dataEmissao'] = { $gte: new Date(dataInicial), $lte: new Date(dataFinal) };
    } else if (dataInicial) {
      argumentos['dataEmissao'] = { $gte: new Date(dataInicial) };
    }

    return this.find(argumentos)
      .populate('proposta')
      .sort({ numero: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  },

  /**
   * Obter a útima nota emitida.
   */
  getUltimaNota() {
    return this.find()
      .populate('proposta')
      .sort({ 'numero': -1 })
      .limit(1)
      .exec();
  },

  getValorTotal({ filter = '', proposta = '', dataInicial = '', dataFinal = '' } = {}) {
    const argumentos = {};

    if (proposta) {
      argumentos['proposta'] = new ObjectID(proposta);
    }

    if (dataInicial && dataFinal) {
      argumentos['dataEmissao'] = { $gte: new Date(dataInicial), $lte: new Date(dataFinal) };
    } else if (dataInicial) {
      argumentos['dataEmissao'] = { $gte: new Date(dataInicial) };
    }

    return this.aggregate([
      { $match: argumentos },
      { $group: { _id: { proposta: proposta }, valorTotal: { $sum: '$valor' } } }
    ]).exec();
  },

  getValorRecebido(propostaIds) {
    return this.aggregate([
      { $match: { proposta: { $in: propostaIds } } },
      { $group: { _id: null, valorRecebido: { $sum: '$valor' } } }
    ]).exec();
  }
};

/**
 * @typedef Nota
 */
export default mongoose.model('Nota', NotaSchema);
