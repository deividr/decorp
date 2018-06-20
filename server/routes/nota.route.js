import express from 'express';
import validate from 'express-validation';
import paramValidation from '../config/param-validation';
import notaCtrl from '../controllers/nota.controller';

const router = express.Router();

router.route('/')
  /** GET /api/notas - Obter lista de notas */
  .get(notaCtrl.list)

  /** POST /api/notas - Criar nova nota */
  .post(validate(paramValidation.createNota), notaCtrl.create);

router.route('/total')
  .get(notaCtrl.total);

router.route('/ultimaNota')
  .get(notaCtrl.ultimaNota);

router.route('/valortotal')
  .get(notaCtrl.valorTotal);

router.route('/valorRecebido')
  .get(notaCtrl.valorRecebido);

router.route('/:notaId')
  /** GET /api/post/:notaId - Obter nota */
  .get(notaCtrl.get)

  /** PUT /api/notas/:notaId - Atualizar Nota */
  .put(validate(paramValidation.updateNota), notaCtrl.update)

  /** DELETE /api/notas/:notaId - Excluir Nota */
  .delete(notaCtrl.remove);

/** Load post when API with notaId route parameter is hit */
router.param('notaId', notaCtrl.load);

export default router;
