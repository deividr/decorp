/**
 * recebimento: 0 - Recebida, 1 - Recebendo, 2 - A receber
 */
export class Proposta {
  _id: string;
  numero: string;
  descricao: string;
  dataInicio: Date;
  dataFim: Date;
  qtdeHoras: number;
  qtdeParcelas: number;
  valorEstimado: number;
  fase: Fase;
  empresa: string;
  observacoes: string;
  recebimento: number;
}

/**
 * faturada: 0 - Faturada, 1 - Não Faturada, 2 - Cancelada
 */
export class Nota {
  _id: string;
  numero: number;
  empresa: string;
  dataEmissao: Date;
  dataFatura: Date;
  valor: number;
  proposta: Proposta;
  faturada: number;
}

export enum Fase {
  Estudo,
  Contratação,
  Desenvolvimento,
  Homologação,
  Finalizado
}
