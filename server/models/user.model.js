import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * User Schema
 */
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  login: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
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
UserSchema.method({});

/**
 * Statics
 */
UserSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((user) => {
        if (user) {
          return user;
        }
        const err = new APIError('User inexistente!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      })
      .catch(e => {
        const err = new APIError('User inexistente!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * Listar as users por ordem decrescente de número de user.
   * @param {number} skip - Numero de users a ser ignoradas.
   * @param {number} limit - Máximo de user que podem ser retornadas.
   * @returns {Promise<User[]>}
   */
  list({
    skip = 0,
    limit = 50
  } = {}) {
    return this.find()
      .sort({
        numero: +1
      })
      .skip(+skip)
      .limit(+limit)
      .exec();
  },

  getByLogin({
    login = ''
  } = {}) {
    return this.find({
        login: login
      })
      .exec();
  },

  getByLoginAndPassword({
    login = '',
    password = ''
  } = {}) {
    return this.findOne({
        $and: [{
            login: login
          },
          {
            password: password
          }
        ]
      })
      .exec();
  }
};

/**
 * @typedef User
 */
export default mongoose.model('User', UserSchema);
