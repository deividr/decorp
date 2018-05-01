export class Proposta {
  _id: String;
  numero: String;
  descricao: String;
  dataInicio: Date;
  dataFim: Date;
  qtdeHoras: Number;
  qtdeParcelas: Number;
  fase: Fase;
  empresa: String;
  observacoes: String;
}

export class Nota {
  _id: String;
  numero: Number;
  empresa: String;
  dataEmissao: Date;
  dataFatura: Date;
  valor: Number;
  proposta: Proposta;
  faturada: Boolean;
}

export enum Fase {
  Estudo,
  Contratação,
  Desenvolvimento,
  Homologação,
  Finalizado
}
