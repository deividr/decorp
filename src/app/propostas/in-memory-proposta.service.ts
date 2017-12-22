import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryPropostaService implements InMemoryDbService {
  createDb() {
    const propostas = [
      { id:  1, numero: '2RP-17-1234-01', descricao: 'YMCC - Seguro Super Protegido', empresa: 'Scopus', qtdeHoras: 100 },
      { id:  2, numero: '2RP-17-1234-01', descricao: 'YMBE - Descricao 2', empresa: 'Scopus', qtdeHoras: 1150 },
      { id:  3, numero: '2RP-17-1234-01', descricao: 'YMVC - Descricao 3', empresa: 'Scopus', qtdeHoras: 2100 },
      { id:  4, numero: '2RP-17-1234-01', descricao: 'YMMD - Descricao 4', empresa: 'Scopus', qtdeHoras: 500 },
      { id:  5, numero: '2RP-17-1234-01', descricao: 'YMKE - Descricao 5', empresa: 'Scopus', qtdeHoras: 800 },
      { id:  6, numero: '2RP-17-1234-01', descricao: 'YMCC - Venda e Ativação de Crédito', empresa: 'Scopus', qtdeHoras: 150 },
      { id:  7, numero: '2RP-17-1234-01', descricao: 'YMCC - Descricao 7', empresa: 'Scopus', qtdeHoras: 230 },
      { id:  8, numero: '2RP-17-1234-01', descricao: 'YMBE - Descricao 8', empresa: 'Scopus', qtdeHoras: 860 },
      { id:  9, numero: '2RP-17-1234-01', descricao: 'YMCC - Descricao 9', empresa: 'Scopus', qtdeHoras: 3100 },
      { id: 10, numero: '2RP-17-1234-01', descricao: 'SINV - Descricao 10', empresa: 'Scopus', qtdeHoras: 400 },
      { id: 11, numero: '2RP-17-1234-01', descricao: 'SINV - Descricao 11', empresa: 'Scopus', qtdeHoras: 400 },
      { id: 12, numero: '2RP-17-1234-01', descricao: 'SINV - Descricao 12', empresa: 'Scopus', qtdeHoras: 400 },
      { id: 13, numero: '2RP-17-1234-01', descricao: 'SINV - Descricao 13', empresa: 'Scopus', qtdeHoras: 400 },
      { id: 14, numero: '2RP-17-1234-01', descricao: 'SINV - Descricao 14', empresa: 'Scopus', qtdeHoras: 400 },
      { id: 15, numero: '2RP-17-1234-01', descricao: 'SINV - Descricao 15', empresa: 'Scopus', qtdeHoras: 400 },
      { id: 16, numero: '2RP-17-1234-01', descricao: 'SINV - Descricao 16', empresa: 'Scopus', qtdeHoras: 400 },
      { id: 17, numero: '2RP-17-1234-01', descricao: 'SINV - Descricao 17', empresa: 'Scopus', qtdeHoras: 400 },
      { id: 18, numero: '2RP-17-1234-01', descricao: 'SINV - Descricao 18', empresa: 'Scopus', qtdeHoras: 400 },
      { id: 19, numero: '2RP-17-1234-01', descricao: 'SINV - Descricao 19', empresa: 'Scopus', qtdeHoras: 400 },
      { id: 20, numero: '2RP-17-1234-01', descricao: 'SINV - Descricao 20', empresa: 'Scopus', qtdeHoras: 400 },
      { id: 21, numero: '2RP-17-1234-01', descricao: 'SINV - Descricao 21', empresa: 'Scopus', qtdeHoras: 400 }
    ];

    return {propostas};
  }
}
