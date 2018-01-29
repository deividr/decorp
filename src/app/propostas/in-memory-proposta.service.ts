import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryPropostaService implements InMemoryDbService {
  createDb() {
    const propostas = [
      { id:  1,
        numero: '2RP-17-1234-01',
        descricao: 'YMCC - Seguro Super Protegido na Fidelity',
        dataInicio: '2018-01-10',
        dataFim: '2018-12-30',
        fase: 'Contratação',
        empresa: 'Scopus',
        qtdeHoras: 100,
        observacoes: 'Qualquer coisa de observação serve!' },
      { id:  2, numero: '2RP-17-1234-01', descricao: 'YMBE - Descricao 2', dataInicio: '2018-01-10', dataFim: '2018-12-30', fase: 'Contratação', empresa: 'Scopus', qtdeHoras: 115, observacoes: 'Qualquer coisa de observação serve!' },
      { id:  3, numero: '2RP-17-1234-01', descricao: 'YMVC - Descricao 3', dataInicio: '2018-01-10', dataFim: '2018-12-30', fase: 'Contratação', empresa: 'Scopus', qtdeHoras: 210, observacoes: 'Qualquer coisa de observação serve!' },
      { id:  4, numero: '2RP-17-1234-01', descricao: 'YMMD - Descricao 4', dataInicio: '2018-01-10', dataFim: '2018-12-30', fase: 'Contratação', empresa: 'Scopus', qtdeHoras: 500, observacoes: 'Qualquer coisa de observação serve!' },
      { id:  5, numero: '2RP-17-1234-01', descricao: 'YMKE - Descricao 5', dataInicio: '2018-01-10', dataFim: '2018-12-30', fase: 'Contratação', empresa: 'Scopus', qtdeHoras: 800, observacoes: 'Qualquer coisa de observação serve!' },
      { id:  6, numero: '2RP-17-1234-01', descricao: 'YMCC - Venda e Ativação de Crédito', dataInicio: '2018-01-10', dataFim: '2018-12-30', fase: 'Contratação', empresa: 'Scopus', qtdeHoras: 150, observacoes: 'Qualquer coisa de observação serve!' },
      { id:  7, numero: '2RP-17-1234-01', descricao: 'YMCC - Descricao 7', dataInicio: '2018-01-10', dataFim: '2018-12-30', fase: 'Contratação', empresa: 'Scopus', qtdeHoras: 230, observacoes: 'Qualquer coisa de observação serve!' },
      { id:  8, numero: '2RP-17-1234-01', descricao: 'YMBE - Descricao 8', dataInicio: '2018-01-10', dataFim: '2018-12-30', fase: 'Contratação', empresa: 'Scopus', qtdeHoras: 860, observacoes: 'Qualquer coisa de observação serve!' },
      { id:  9, numero: '2RP-17-1234-01', descricao: 'YMCC - Descricao 9', dataInicio: '2018-01-10', dataFim: '2018-12-30', fase: 'Contratação', empresa: 'Scopus', qtdeHoras: 310, observacoes: 'Qualquer coisa de observação serve!' },
      { id: 10, numero: '2RP-17-1234-01', descricao: 'SINV - Descricao 10', dataInicio: '2018-01-10', dataFim: '2018-12-30', fase: 'Contratação', empresa: 'Scopus', qtdeHoras: 400, observacoes: 'Qualquer coisa de observação serve!' },
      { id: 11, numero: '2RP-17-1234-01', descricao: 'SINV - Descricao 11', dataInicio: '2018-01-10', dataFim: '2018-12-30', fase: 'Contratação', empresa: 'Scopus', qtdeHoras: 400, observacoes: 'Qualquer coisa de observação serve!' },
      { id: 12, numero: '2RP-17-1234-01', descricao: 'SINV - Descricao 12', dataInicio: '2018-01-10', dataFim: '2018-12-30', fase: 'Contratação', empresa: 'Scopus', qtdeHoras: 400, observacoes: 'Qualquer coisa de observação serve!' },
      { id: 13, numero: '2RP-17-1234-01', descricao: 'SINV - Descricao 13', dataInicio: '2018-01-10', dataFim: '2018-12-30', fase: 'Contratação', empresa: 'Scopus', qtdeHoras: 400, observacoes: 'Qualquer coisa de observação serve!' },
      { id: 14, numero: '2RP-17-1234-01', descricao: 'SINV - Descricao 14', dataInicio: '2018-01-10', dataFim: '2018-12-30', fase: 'Contratação', empresa: 'Scopus', qtdeHoras: 400, observacoes: 'Qualquer coisa de observação serve!' },
      { id: 15, numero: '2RP-17-1234-01', descricao: 'SINV - Descricao 15', dataInicio: '2018-01-10', dataFim: '2018-12-30', fase: 'Contratação', empresa: 'Scopus', qtdeHoras: 400, observacoes: 'Qualquer coisa de observação serve!' },
      { id: 16, numero: '2RP-17-1234-01', descricao: 'SINV - Descricao 16', dataInicio: '2018-01-10', dataFim: '2018-12-30', fase: 'Contratação', empresa: 'Scopus', qtdeHoras: 400, observacoes: 'Qualquer coisa de observação serve!' },
      { id: 17, numero: '2RP-17-1234-01', descricao: 'SINV - Descricao 17', dataInicio: '2018-01-10', dataFim: '2018-12-30', fase: 'Contratação', empresa: 'Scopus', qtdeHoras: 400, observacoes: 'Qualquer coisa de observação serve!' },
      { id: 18, numero: '2RP-17-1234-01', descricao: 'SINV - Descricao 18', dataInicio: '2018-01-10', dataFim: '2018-12-30', fase: 'Contratação', empresa: 'Scopus', qtdeHoras: 400, observacoes: 'Qualquer coisa de observação serve!' },
      { id: 19, numero: '2RP-17-1234-01', descricao: 'SINV - Descricao 19', dataInicio: '2018-01-10', dataFim: '2018-12-30', fase: 'Contratação', empresa: 'Scopus', qtdeHoras: 400, observacoes: 'Qualquer coisa de observação serve!' },
      { id: 20, numero: '2RP-17-1234-01', descricao: 'SINV - Descricao 20', dataInicio: '2018-01-10', dataFim: '2018-12-30', fase: 'Contratação', empresa: 'Scopus', qtdeHoras: 400, observacoes: 'Qualquer coisa de observação serve!' },
      { id: 21, numero: '2RP-17-1234-01', descricao: 'SINV - Descricao 21', dataInicio: '2018-01-10', dataFim: '2018-12-30', fase: 'Contratação', empresa: 'Scopus', qtdeHoras: 400, observacoes: 'Qualquer coisa de observação serve!' }
    ];

    return {propostas};
  }
}
