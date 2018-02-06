import express from 'express';
import validate from 'express-validation';
import paramValidation from '../config/param-validation';
import prpstaCtrl from '../controllers/proposta.controller';

const router = express.Router();

router.route('/')
  /** GET /api/propostas - Obter lista de propostas */
  .get(prpstaCtrl.list)

  /** POST /api/propostas - Criar nova proposta */
  .post(validate(paramValidation.createProposta), prpstaCtrl.create);

router.route('/:propostaId')
  /** GET /api/post/:propostaId - Obter proposta */
  .get(prpstaCtrl.get)

  /** PUT /api/propostas/:propostaId - Atualizar Proposta */
  .put(validate(paramValidation.updateProposta), prpstaCtrl.update)

  /** DELETE /api/propostas/:propostaId - Excluir Proposta */
  .delete(prpstaCtrl.remove);

/** Load post when API with propostaId route parameter is hit */
router.param('propostaId', prpstaCtrl.load);

export default router;
