export class Proposta {
  id: number;
  numero: string;
  descricao: string;
  dataInicio: Date;
  dataFim: Date;
  qtdeHoras: number;
  fase: Fase;
  empresa: string;
  observao: string;
}

export enum Fase {
  Estudo = 'Estudo',
  Contratação = 'Contratação',
  Desenvolvimento = 'Desenvolvimento',
  Homologação = 'Homologação',
  Finalizado = 'Finalizado'
}
