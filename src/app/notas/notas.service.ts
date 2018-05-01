import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Nota } from '../model/models';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { isNumber } from 'util';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable()
export class NotasService {
  mensagem: String = '';
  mensagemErro: String = '';
  private notaUrl = 'api/notas';

  constructor(private http: HttpClient) { }

  getNotas(filter, propostaId, limit, skip): Observable<Nota[]> {
    let httpParams = new HttpParams()
      .set('limit', limit)
      .set('skip', skip);

    if (filter) {
      httpParams = httpParams.set('filter', filter);
    }

    if (propostaId) {
      httpParams = httpParams.set('proposta', propostaId);
    }

    return this.http.get<Nota[]>(this.notaUrl, { params: httpParams }).pipe(
      tap(_ => console.log('notas encontradas')),
      catchError(this.handlerError<Nota[]>('getNota', []))
    );
  }

  getTotalNotas(filter, propostaId): Observable<any> {
    const url = `${this.notaUrl}/total`;
    let httpParams = new HttpParams();

    if (filter) {
      httpParams = httpParams.set('filter', filter);
    }

    if (propostaId) {
      httpParams = httpParams.set('proposta', propostaId);
    }

    return this.http.get<any>(url, { params: httpParams }).pipe(
      tap(_ => console.log('total obtido com sucesso')),
      catchError(this.handlerError<any>('getTotalNota'))
    );
  }

  getNota(id: String): Observable<Nota> {
    const url = `${this.notaUrl}/${id}`;

    return this.http.get<Nota>(url).pipe(
      tap(_ => console.log('nota encontrada!')),
      catchError(this.handlerError<Nota>('getNota'))
    );
  }

  insert(nota: Nota): Observable<Nota> {
    return this.http.post<Nota>(this.notaUrl, nota, httpOptions).pipe(
      tap((prpsta: Nota) => this.mensagem = `Nota ${prpsta.numero} incluída com sucesso!`),
      catchError(this.handlerError<any>('insertNota'))
    );
  }

  update(nota: Nota): Observable<any> {
    const url = `${this.notaUrl}/${nota._id}`;

    return this.http.put(url, nota, httpOptions).pipe(
      tap(_ => this.mensagem = `Nota ${nota.numero} atualizada com sucesso!`),
      catchError(this.handlerError<any>('updateNota'))
    );
  }

  delete(nota: Nota): Observable<Nota> {
    const url = `${this.notaUrl}/${nota._id}`;

    return this.http.delete<Nota>(url, httpOptions).pipe(
      tap(_ => this.mensagem = `Nota ${nota.numero} excluída com sucesso`),
      catchError(this.handlerError<Nota>('delete'))
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

  getImposto(valorNota: Number): String {
    return (parseFloat(valorNota.toString()) * 0.15).toFixed(2);
  }

  getDescricaoNota(valorNota: Number): String {
    const valor = parseFloat(valorNota.toString());
    const cofins = (valor * 0.0142).toFixed(2);
    const inss = (valor * 0.04).toFixed(2);
    const issqn = (valor * 0.0279).toFixed(2);
    // tslint:disable-next-line:max-line-length
    return `NOTA: EM CUMPRIMENTO A LEI 12.741/2012, IMPOSTOS PAGO NO DAS NESTA NOTA FISCAL COFINS 1.42% R$ ${cofins}, INSS/CPP 4.00% R$ ${inss} e ISSQN 2.79% R$ ${issqn}.`;
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
