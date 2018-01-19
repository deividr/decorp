import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Proposta } from '../model/models';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

@Injectable()
export class PropostasService {
  mensagem: String = '';
  private propostaUrl = 'api/propostas';

  constructor(private http: HttpClient) { console.log('Criou um PropostaService'); }

  getPropostas(): Observable<Proposta[]> {
    return this.http.get<Proposta[]>(this.propostaUrl).pipe(
      tap(_ => console.log('propostas encontradas')),
      catchError(this.handlerError<Proposta[]>('getProposta', [])));
  }

  getProposta(id: number): Observable<Proposta> {
    const url = `${this.propostaUrl}/${id}`;
    return this.http.get<Proposta>(url).pipe(
      tap(_ => console.log('proposta encontrada!')),
      catchError(this.handlerError<Proposta>('getProposta'))
    );
  }

  search(filter: String): Observable<Proposta[]> {
    const url = `${this.propostaUrl}/?descricao=${filter}`;
    return this.http.get<Proposta[]>(url).pipe(
      tap(_ => console.log(`resultados encontrados para "${filter}"`)),
      catchError(this.handlerError<Proposta[]>('search', []))
    );
  }

  delete(proposta: Proposta): Observable<Proposta> {
    const url = `${this.propostaUrl}/${proposta.id}`;

    return this.http.delete<Proposta>(url, httpOptions).pipe(
      tap(_ => {
        this.mensagem = `Proposta ${proposta.numero} excluída com sucesso`;
      }),
      catchError(this.handlerError<Proposta>('delete'))
    );
  }

  private handlerError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error('Ocorreu um erro: ', error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
