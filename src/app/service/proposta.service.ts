import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';

import { Proposta } from '../model/models';

import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';

interface Data {
  data: Proposta[];
}

@Injectable()
export class PropostaService {
  private propostaUrl = 'api/propostas';
  private headers = new Headers({ 'Content-type': 'application/json' });

  constructor(private http: HttpClient) { }

  getPropostas(): Observable<Proposta[]> {
    return this.http.get<Proposta[]>(this.propostaUrl)
      .pipe(catchError(this.handlerError));
  }

  search(filter: string): Observable<Proposta[]> {
    return this.http.get<Proposta[]>(`${this.propostaUrl}/?descricao=${filter}`);
/*       .pipe(
      tap(_ => console.log(`found heroes matching "${filter} e ${filter}"`)),
      catchError(this.handlerError)
      ); */
  }

  filtrarProposta(propostas: Proposta[], filter: string): Proposta[] {
    return propostas.filter(proposta => {
      if (proposta.numero.toUpperCase().includes(filter.toUpperCase()) ||
        proposta.descricao.toUpperCase().includes(filter.toUpperCase())) {
        return true;
      }
    });
  }

  private handlerError(error: any): Promise<any> {
    console.log('Ocorreu um erro: ', error);
    return Promise.reject(error.message || error);
  }
}
