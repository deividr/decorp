export class Proposta {
  id: number;
  numero: string;
  descricao: string;
  dataInicio: Date;
  dataFim: Date;
  qtdeHoras: number;
  fase: Fase;
  empresa: string;
  observacoes: string;
}

export enum Fase {
  Estudo,
  Contratação,
  Desenvolvimento,
  Homologação,
  Finalizado
}
