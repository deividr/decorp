export class Proposta {
  _id: Number;
  numero: String;
  descricao: String;
  dataInicio: Date;
  dataFim: Date;
  qtdeHoras: Number;
  fase: Fase;
  empresa: String;
  observacoes: String;
}

export class Nota {
  _id: Number;
  numero: Number;
  empresa: String;
  dataEmissao: Date;
  dataFatura: Date;
  valor: Number;
  idProposta: Number;
}

export enum Fase {
  Estudo,
  Contratação,
  Desenvolvimento,
  Homologação,
  Finalizado
}
