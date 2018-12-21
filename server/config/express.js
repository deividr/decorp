import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import httpStatus from 'http-status';
import expressValidation from 'express-validation';
import routes from '../routes/index.route';
import config from './config';
import APIError from '../helpers/APIError';
import path from 'path';
import appRoot from 'app-root-path';
import expressJWT from 'express-jwt';

const app = express();

const checkIfAuthenticated = expressJWT({
  secret: process.env.PUBLIC_KEY.trim()
});

if (config.env === 'development') {
  app.use(logger('dev'));
}

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(express.static(path.join(appRoot.path, 'dist')));

// Validar permissão, exceto quando caminho for login.
app.use(checkIfAuthenticated.unless({path: '/api/auth'}));

app.use('/api', routes);

app.get('*', (req, res) => {
  res.sendFile(path.join(appRoot.path, 'dist/index.html'));
});

// if error is not an instanceOf APIError, convert it.
app.use((err, req, res, next) => {
  if (err instanceof expressValidation.ValidationError) {
    // validation error contains errors which is an array of error each containing message[]
    console.log('Entrou no tratamento de erros');
    const unifiedErrorMessage = err.errors.map(error => error.messages.join('. ')).join(' and ');
    console.log(unifiedErrorMessage);
    const error = new APIError(unifiedErrorMessage, err.status, true);
    return next(error);
  } else if (!(err instanceof APIError)) {
    const apiError = new APIError(err.message, err.status, err.isPublic);
    return next(apiError);
  }
  return next(err);
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new APIError('API not found', httpStatus.NOT_FOUND);
  return next(err);
});

// error handler, send stacktrace only during development
app.use((err, req, res, next) => // eslint-disable-line no-unused-vars
  res.status(err.status).json({
    message: err.isPublic ? err.message : httpStatus[err.status],
    stack: config.env === 'development' ? err.stack : {}
  })
);

export default app;
