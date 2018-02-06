import Proposta from '../models/proposta.model';

function load(params) {
  return Proposta.get(params.id);
}

function get(req, res) {
  return res.json(req.proposta);
}

function create(params) {
  const proposta = new Proposta({
    numero: params.data.numero,
    descricao: params.data.descricao,
    dataInicio: params.data.dataInicio,
    dataFim: params.data.datafim,
    qtdeHoras: params.data.qtdeHoras,
    fase: params.data.fase,
    empresa: params.data.empresa,
    observacoes: params.data.observacoes
  });
  return proposta.save();
}

function update(params) {
  return load(params).then(proposta => {
    const tmp = proposta;
    proposta.numero = params.data.numero;
    proposta.descricao = params.data.descricao;
    proposta.dataInicio = params.data.dataInicio;
    proposta.dataFim = params.data.datafim;
    proposta.qtdeHoras = params.data.qtdeHoras;
    proposta.fase = params.data.fase;
    proposta.empresa = params.data.empresa;
    proposta.observacoes = params.data.observacoes;
    return proposta.save()
  });
}

function list(params) {
  const { limit = 50, skip = 0 } = params;
  return Proposta.list({ limit, skip })
}

function remove(params) {
  return load(params).then(proposta => proposta.remove());
}

export default { load, get, create, update, list, remove };
