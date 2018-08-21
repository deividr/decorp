import User from '../models/user.model';
import * as jwt from 'jsonwebtoken';

const PRIVATE_KEY = `
-----BEGIN EC PARAMETERS-----
BggqhkjOPQMBBw==
-----END EC PARAMETERS-----
-----BEGIN EC PRIVATE KEY-----
MHcCAQEEIMRaaakPRULvTA29+gMddkT3q3AbLVpr986wIlacGpzaoAoGCCqGSM49
AwEHoUQDQgAEh/YHlmq0l2jniPJkix84v6N5PxBs7ixY5QC0mRL2gQntE9EfWAYD
ukN5ImK/t1FzGF/ui3rRtc+Xh7GpnHGT9A==
-----END EC PRIVATE KEY-----
`

/**
 * Efetuar login do usário, consistindo a existencia dele e se a password informada é a mesma informada
 * pelo usuário.
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function login(req, res, next) {
  const login = req.body.login;
  const password = req.body.password;

  User.getByLoginAndPassword({
      login,
      password
    })
    .then(user => {
      if (user) {
        const jwtBearerToken = jwt.sign({
            login: user.login
          },
          PRIVATE_KEY.trim(), {
            algorithm: 'RS256',
            expiresIn: 10,
            subject: user._id.toString()
          });

        res.json({
          idToken: jwtBearerToken,
          expiresIn: 10
        });
      } else {
        res.sendStatus(401);
      }
    })
    .catch(e => next(e));
}

export default {
  login
};
