import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Proposta } from '../model/models';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable()
export class PropostasService {
  mensagem: String = '';
  mensagemErro: String = '';
  private propostaUrl = 'api/propostas';

  constructor(private http: HttpClient) { }

  getPropostas(filter, limit, skip): Observable<Proposta[]> {
    let httpParams = new HttpParams()
      .set('limit', limit)
      .set('skip', skip);

    if (filter) {
      httpParams = httpParams.set('filter', filter);
    }

    return this.http.get<Proposta[]>(this.propostaUrl, { params: httpParams }).pipe(
      tap(_ => console.log('propostas encontradas')),
      catchError(this.handlerError<Proposta[]>('getProposta', []))
    );
  }

  getTotalPropostas(filter): Observable<any> {
    const url = `${this.propostaUrl}/total`;
    let httpParams = new HttpParams();

    if (filter) {
      httpParams = httpParams.set('filter', filter);
    }

    return this.http.get<any>(url, { params: httpParams }).pipe(
      tap(_ => console.log('total obtido com sucesso')),
      catchError(this.handlerError<any>('getTotalProposta'))
    );
  }

  getProposta(id: String): Observable<Proposta> {
    const url = `${this.propostaUrl}/${id}`;

    return this.http.get<Proposta>(url).pipe(
      tap(_ => console.log('proposta encontrada!')),
      catchError(this.handlerError<Proposta>('getProposta'))
    );
  }

  insert(proposta: Proposta): Observable<Proposta> {
    console.log(`Data no angular = ${proposta.dataInicio} ${proposta.dataFim}`);
    return this.http.post<Proposta>(this.propostaUrl, proposta, httpOptions).pipe(
      tap((prpsta: Proposta) => this.mensagem = `Proposta ${prpsta.numero} incluída com sucesso!`),
      catchError(this.handlerError<any>('insertProposta'))
    );
  }

  update(proposta: Proposta): Observable<any> {
    const url = `${this.propostaUrl}/${proposta._id}`;

    return this.http.put(url, proposta, httpOptions).pipe(
      tap(_ => this.mensagem = `Proposta ${proposta.numero} atualizada com sucesso!`),
      catchError(this.handlerError<any>('updateProposta'))
    );
  }

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
