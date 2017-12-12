import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';

import { Proposta } from '../model/models';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { catchError, map, tap } from 'rxjs/operators';

interface Data {
  data: Proposta[];
}

@Injectable()
export class PropostaService {
  private propostaUrl = 'api/propostas';
  private headers = new Headers({ 'Content-type': 'application/json' });

  constructor(private http: HttpClient) { }

  getPropostas(page: number, perPage: number, filter: string): Promise<{}> {
    return this.http
      .get(this.propostaUrl)
      .toPromise()
      .then(data => {
        let propostas = data as Proposta[];

        if (filter) {
          propostas = this.filtrarProposta(propostas, filter);
        }

        const retorno = { total: 0, propostas: [] };
        const inicio = page * perPage - perPage;
        const fim = page * perPage;

        retorno.total = propostas.length;
        retorno.propostas = propostas.slice(inicio, fim);
        return retorno;
      })
      .catch(this.handlerError);
  }

  search(filter: string): Observable<Proposta> {
    return this.http.get<Proposta[]>(this.propostaUrl + `/?descricao=${filter}`)
      .pipe(
        tap(_ => console.log(`found heroes matching "${filter}"`)),
        catchError(this.handlerError)
      );
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
