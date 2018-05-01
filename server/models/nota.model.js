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
    type: String,
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
    type: Boolean,
    default: false,
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
   * @param {number} skip - Numero de notas a ser ignoradas.
   * @param {number} limit - Máximo de nota que podem ser retornadas.
   * @returns {Promise<Nota[]>}
   */
  list({ filter = '', proposta = '', skip = 0, limit = 50 } = {}) {
    if (proposta) {
      const propostaId = new ObjectID(proposta);
      return this.find({ proposta: propostaId })
        .populate('proposta')
        .sort({ numero: +1 })
        .skip(+skip)
        .limit(+limit)
        .exec();
    } else {
      return this.find()
        .populate('proposta')
        .sort({ numero: +1 })
        .skip(+skip)
        .limit(+limit)
        .exec();
    }
  }
};

/**
 * @typedef Nota
 */
export default mongoose.model('Nota', NotaSchema);
