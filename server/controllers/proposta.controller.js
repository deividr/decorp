import Proposta from '../models/proposta.model';

/**
 * Carregar Proposta e anexar a requisição.
 */
function load(req, res, next, id) {
  Proposta.get(id)
    .then(proposta => {
      req.proposta = proposta;
      return next();
    })
    .catch(e => next(e));
}

/**
 * Obter Proposta
 */
function get(req, res) {
  return res.json(req.proposta);
}

/**
 * Incluir proposta
 */
function create(req, res, next) {
  const proposta = new Proposta({
    numero: req.body.numero,
    descricao: req.body.descricao,
    dataInicio: req.body.dataInicio,
    dataFim: req.body.dataFim,
    qtdeHoras: req.body.qtdeHoras,
    qtdeParcelas: req.body.qtdeParcelas,
    valorEstimado: req.body.valorEstimado,
    fase: req.body.fase,
    empresa: req.body.empresa,
    observacoes: req.body.observacoes,
    recebimento: req.body.recebimento,
  });

  proposta.save()
    .then(propostaSalva => res.json(propostaSalva))
    .catch(e => next(e));
}

/**
 * Atualizar proposta
 */
function update(req, res, next) {
  const proposta = req.proposta;

  proposta.numero = req.body.numero;
  proposta.descricao = req.body.descricao;
  proposta.dataInicio = req.body.dataInicio;
  proposta.dataFim = req.body.dataFim;
  proposta.qtdeHoras = req.body.qtdeHoras;
  proposta.qtdeParcelas = req.body.qtdeParcelas;
  proposta.valorEstimado = req.body.valorEstimado;
  proposta.fase = req.body.fase;
  proposta.empresa = req.body.empresa;
  proposta.observacoes = req.body.observacoes;
  proposta.recebimento = req.body.recebimento;

  proposta.save()
    .then(propostaSalva => res.json(propostaSalva))
    .catch(e => next(e));
}

/**
 * Excluir proposta
 */
function remove(req, res, next) {
  const proposta = req.proposta;
  proposta.remove()
    .then(propostaExcluida => res.json(propostaExcluida))
    .catch(e => next(e));
}

/**
 * Obter lista de propostas.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {Proposta[]}
 */
function list(req, res, next) {
  const { filter = '', recebimento = '', limit = 50, skip = 0 } = req.query;

  Proposta.list({ filter, recebimento, limit, skip })
    .then(propostas => res.json(propostas))
    .catch(e => next(e));
}

/** 
 * Obter a quantidade total de proposta disponível.
 */
function total(req, res, next) {
  const { filter = '', recebimento = '' } = req.query;
  const limit = 0;
  const skip = 0;

  Proposta.list({ filter, recebimento, limit, skip })
    .then(propostas => res.json({ total: propostas.length }))
    .catch(e => next(e));
}

/**
 * Obter o valor total das propostas em recebimento e das que iremos receber.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function valorTotalPrevisto(req, res, next) {
  Proposta.valorTotalPrevisto()
    .then(data => {console.error(data); res.json({ valorTotalPrevisto: data[0].valorTotalPrevisto })})
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove, total, valorTotalPrevisto };
