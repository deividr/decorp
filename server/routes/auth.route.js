import express from 'express';
import authCtrl from '../controllers/auth.controller';

const router = express.Router();

router.route('/')
  /** POST /api/auth - Efetuar Login */
  .post(authCtrl.login)

export default router;
