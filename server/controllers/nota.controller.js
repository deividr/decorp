import Nota from '../models/nota.model';

/**
 * Carregar Nota e anexar a requisição.
 */
function load(req, res, next, id) {
  Nota.get(id)
    .then(nota => {
      req.nota = nota;
      return next();
    })
    .catch(e => next(e));
}

/**
 * Obter Nota
 */
function get(req, res) {
  return res.json(req.nota);
}

/**
 * Incluir nota
 */
function create(req, res, next) {
  const nota = new Nota({
    numero: req.body.numero,
    empresa: req.body.empresa,
    dataEmissao: req.body.dataEmissao,
    dataFatura: req.body.dataFatura,
    valor: req.body.valor,
    proposta: req.body.proposta,
    faturada: req.body.faturada
  });

  nota.save()
    .then(notaSalva => res.json(notaSalva))
    .catch(e => next(e));
}

/**
 * Atualizar nota
 */
function update(req, res, next) {
  const nota = req.nota;
  
  nota.numero = req.body.numero;
  nota.empresa = req.body.empresa;
  nota.dataEmissao = req.body.dataEmissao;
  nota.dataFatura = req.body.dataFatura;
  nota.valor = req.body.valor;
  nota.proposta = req.body.proposta;
  nota.faturada = req.body.faturada;

  nota.save()
    .then(notaSalva => res.json(notaSalva))
    .catch(e => next(e));
}

/**
 * Obter lista de notas.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {Nota[]}
 */
function list(req, res, next) {
  const { filter = '', proposta = '', limit = 50, skip = 0 } = req.query;
  
  Nota.list({ filter, proposta, limit, skip })
    .then(notas => res.json(notas))
    .catch(e => next(e));
}

/** 
 * Obter a quantidade total de nota disponível.
 */
function total(req, res, next) {
  const { filter = '', proposta = '' } = req.query;
  const limit = 0;
  const skip = 0;
  
  Nota.list({ filter, proposta, limit, skip })
    .then(notas => res.json({total: notas.length}))
    .catch(e => next(e));
}

/**
 * Excluir nota
 */
function remove(req, res, next) {
  const nota = req.nota;
  nota.remove()
    .then(notaExcluida => res.json(notaExcluida))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove, total };
