import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Proposta } from '../model/models';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable()
export class PropostasService {
  mensagem: String = '';
  mensagemErro: String = '';
  private propostaUrl = 'api/propostas';

  constructor(private http: HttpClient) { }

  /**
   * Obter as propostas para serem listadas.
   * @param param0 Filtros para a pesquisa.
   */
  getPropostas({ filter = '', recebimento = '', limit = null, skip = null } = {}): Observable<Proposta[]> {
    const httpParams = this.getParams({ filter, recebimento, limit, skip });

    return this.http.get<Proposta[]>(this.propostaUrl, { params: httpParams }).pipe(
      tap(_ => console.log('propostas encontradas')),
      catchError(this.handlerError<Proposta[]>('getProposta', []))
    );
  }

  /**
   * Obter a quantidade total de propostas que serão listadas.
   * @param param0 Filtros para proposta.
   */
  getTotalPropostas({ filter = '', recebimento = '' } = {}): Observable<any> {
    const url = `${this.propostaUrl}/total`;

    const httpParams = this.getParams({ filter, recebimento });

    return this.http.get<any>(url, { params: httpParams }).pipe(
      tap(_ => console.log('total obtido com sucesso')),
      catchError(this.handlerError<any>('getTotalProposta'))
    );
  }

  /**
   * Consultar os detalhes de uma proposta.
   * @param id Identificador da proposta que será consultada.
   */
  getProposta(id: String): Observable<Proposta> {
    const url = `${this.propostaUrl}/${id}`;

    return this.http.get<Proposta>(url).pipe(
      tap(_ => console.log('proposta encontrada!')),
      catchError(this.handlerError<Proposta>('getProposta'))
    );
  }

  /**
   * Obter os valores totais que são previstos para as propostas em andamento.
   * Só serão contabilizadas as propostas "a receber" e "em recebimento".
   */
  getValorTotalPrevisto(): Observable<any> {
    const url = `${this.propostaUrl}/valortotalprevisto`;

    return this.http.get<any>(url).pipe(
      tap(_ => console.log('valor total previsto obtido com sucesso!')),
      catchError(this.handlerError<any>('getValorTotalPrevisto'))
    );
  }

  /**
   * Formatar os parâmetros que devem ser enviados para o servidor.
   * @param param Parametros que devem ser formatados para passar ao servidor.
   */
  private getParams({ filter = '', recebimento = '', limit = null, skip = null } = {}): HttpParams {
    let httpParams = new HttpParams();

    if (limit) {
      httpParams = httpParams.set('limit', limit);
    }

    if (skip) {
      httpParams = httpParams.set('skip', skip);
    }

    if (filter) {
      httpParams = httpParams.set('filter', filter);
    }

    if (recebimento) {
      httpParams = httpParams.set('recebimento', recebimento);
    }

    return httpParams;
  }

  /**
   * Inserir uma nova proposta.
   * @param proposta Proposta a ser inserida.
   */
  insert(proposta: Proposta): Observable<Proposta> {
    return this.http.post<Proposta>(this.propostaUrl, proposta, httpOptions).pipe(
      tap((prpsta: Proposta) => this.mensagem = `Proposta ${prpsta.numero} incluída com sucesso!`),
      catchError(this.handlerError<any>('insertProposta'))
    );
  }

  /**
   * Atualizar a proposta.
   * @param proposta Proposta que será atualizada.
   */
  update(proposta: Proposta): Observable<any> {
    const url = `${this.propostaUrl}/${proposta._id}`;

    return this.http.put(url, proposta, httpOptions).pipe(
      tap(_ => this.mensagem = `Proposta ${proposta.numero} atualizada com sucesso!`),
      catchError(this.handlerError<any>('updateProposta'))
    );
  }

  /**
   * Exclusão de proposta da base.
   * @param proposta Proposta a ser excluída da base.
   */
  delete(proposta: Proposta): Observable<Proposta> {
    const url = `${this.propostaUrl}/${proposta._id}`;

    return this.http.delete<Proposta>(url, httpOptions).pipe(
      tap(_ => this.mensagem = `Proposta ${proposta.numero} excluída com sucesso`),
      catchError(this.handlerError<Proposta>('delete'))
    );
  }

  getMensagem(): String {
    // Obtem a mensagem solicitada e limpa a variável.
    const msg = this.mensagem;
    this.mensagem = '';
    return msg;
  }

  getMensagemErro(): String {
    // Obtem a mensagem solicitada e limpa a variável.
    const msg = this.mensagemErro;
    this.mensagemErro = '';
    return msg;
  }

  private handlerError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.mensagemErro = 'Ocorreu um erro no servidor. Favor consultar analista!';
      console.error('Ocorreu um erro: ', error);
      console.log(`${operation} failed: ${error.error.message}`);
      return of(result as T);
    };
  }
}
