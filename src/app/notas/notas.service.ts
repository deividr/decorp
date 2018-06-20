import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Nota } from '../model/models';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable()
export class NotasService {
  private mensagem: String = '';
  private mensagemErro: String = '';
  private _percImposto = 0.155;
  private notaUrl = 'api/notas';

  constructor(private http: HttpClient) { }

  getNotas(
    {
      filter = '',
      propostaId = '',
      dataInicial = '',
      dataFinal = '',
      limit = null,
      skip = null
    } = {}): Observable<Nota[]> {
    const httpParams = this.getHttpParams(
      {
        filter: filter,
        propostaId: propostaId,
        dataInicial: dataInicial,
        dataFinal: dataFinal,
        limit: limit,
        skip: skip
      }
    );

    return this.http.get<Nota[]>(this.notaUrl, { params: httpParams }).pipe(
      tap(_ => console.log('notas encontradas')),
      catchError(this.handlerError<Nota[]>('getNota', []))
    );
  }

  getTotalNotas({ filter = '', propostaId = '', dataInicial = '', dataFinal = '' } = {}): Observable<any> {
    const url = `${this.notaUrl}/total`;

    const httpParams = this.getHttpParams(
      {
        filter: filter,
        propostaId: propostaId,
        dataInicial: dataInicial,
        dataFinal: dataFinal
      }
    );

    return this.http.get<any>(url, { params: httpParams }).pipe(
      tap(_ => console.log('total obtido com sucesso')),
      catchError(this.handlerError<any>('getTotalNota'))
    );
  }

  getValorTotal({ filter = '', propostaId = '', dataInicial = '', dataFinal = '' } = {}) {
    const url = `${this.notaUrl}/valortotal`;

    const httpParams = this.getHttpParams(
      {
        filter: filter,
        propostaId: propostaId,
        dataInicial: dataInicial,
        dataFinal: dataFinal
      }
    );

    return this.http.get<any>(url, { params: httpParams }).pipe(
      tap(_ => console.log('valor total obtido com sucesso')),
      catchError(this.handlerError<any>('getValorTotal'))
    );
  }

  getTotalImpostos(dataInicial: Date, dataFinal: Date): Observable<any> {
    return this.getValorTotal({
      dataInicial: dataInicial.toISOString().slice(0, 10),
      dataFinal: dataFinal.toISOString().slice(0, 10),
    }).pipe(
      tap(data => data.valorTotal = data.valorTotal * this._percImposto),
      catchError(this.handlerError<any>('getTotalImpostos'))
    );
  }

  getHttpParams(
    {
      filter = '',
      propostaId = '',
      dataInicial = '',
      dataFinal = '',
      limit = null,
      skip = null
    } = {}): HttpParams {
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

    if (dataInicial) {
      httpParams = httpParams.set('dataInicial', dataInicial);
    }

    if (dataFinal) {
      httpParams = httpParams.set('dataFinal', dataFinal);
    }

    if (propostaId) {
      httpParams = httpParams.set('proposta', propostaId);
    }

    return httpParams;
  }

  getNota(id: String): Observable<Nota> {
    const url = `${this.notaUrl}/${id}`;

    return this.http.get<Nota>(url).pipe(
      tap(_ => console.log('nota encontrada!')),
      catchError(this.handlerError<Nota>('getNota'))
    );
  }

  getUltimaNota(): Observable<Nota> {
    const url = `${this.notaUrl}/ultimaNota`;

    return this.http.get<Nota>(url).pipe(
      tap(_ => console.log('ultima nota encontrada')),
      catchError(this.handlerError<Nota>('getUltimaNota'))
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

  getImposto(valorNota: Number): String {
    return (parseFloat(valorNota.toString()) * this._percImposto).toFixed(2);
  }

  getDescricaoNota(valorNota: Number): String {
    const valor = parseFloat(valorNota.toString());
    const cofins = (valor * 0.0142).toFixed(2);
    const inss = (valor * 0.04).toFixed(2);
    const issqn = (valor * 0.0279).toFixed(2);
    // tslint:disable-next-line:max-line-length
    return `NOTA: EM CUMPRIMENTO A LEI 12.741/2012, IMPOSTOS PAGO NO DAS NESTA NOTA FISCAL COFINS 1.42% R$ ${cofins}, INSS/CPP 4.00% R$ ${inss} e ISSQN 2.79% R$ ${issqn}.`;
  }

  /**
   * Obter os valores já recebidos pelas propostas, somente será somado os valores das notas
   * que estão em fase de recebimento. As que já foram recebidas não serão computadas.
   */
  getValoresRecebidos() {
    const url = `${this.notaUrl}/valorRecebido`;

    return this.http.get<any>(url).pipe(
      tap(data => {
        const valorRecebido = parseFloat(data.valorRecebido.toString());
        data['valorLiquido'] = valorRecebido - (valorRecebido * this._percImposto);
      }),
      catchError(this.handlerError<any>('getValoresRecebido'))
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

  get perImposto() {
    return this._percImposto;
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
