import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import httpStatus from 'http-status';
import routes from '../routes/index.route';
import config from './config';
import APIError from '../helpers/APIError';
import path from 'path';
import appRoot from 'app-root-path';

const app = express();

if (config.env === 'development') {
  app.use(logger('dev'));
}

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(express.static(path.join(appRoot.path, 'dist')));

app.use('/api', routes);

app.get('*', (req, res) => {
  res.sendFile(path.join(appRoot.path, 'dist/index.html'));
});

// error handler, send stacktrace only during development
app.use((err, req, res, next) => // eslint-disable-line no-unused-vars
  res.status(err.status).json({
    message: err.isPublic ? err.message : httpStatus[err.status],
    stack: config.env === 'development' ? err.stack : {}
  })
);

export default app;
