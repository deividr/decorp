import express from 'express';
//-- import userRoutes from './user.route';
//-- import authRoutes from './auth.route';
import propostasRoutes from './proposta.route';
import notasRoutes from './nota.route';

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount user routes at /users
//-- router.use('/users', userRoutes);

// mount auth routes at /auth
//-- router.use('/auth', authRoutes);

router.use('/propostas', propostasRoutes);

router.use('/notas', notasRoutes);

export default router;
