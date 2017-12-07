import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';

import { Proposta } from '../model/models';

import 'rxjs/add/operator/toPromise';

interface Data {
  data: Proposta[];
}

@Injectable()
export class PropostaService {
  private propostaUrl = 'api/propostas';
  private headers = new Headers({ 'Content-type': 'application/json' });

  constructor(private http: HttpClient) { }

  getPropostas(page: number, perPage: number): Promise<{}> {
    return this.http
      .get(this.propostaUrl)
      .toPromise()
      .then(data => {
        const propostas = data as Proposta[];
        const retorno = { total: 0, propostas: [] };
        const inicio = page * perPage - perPage;
        const fim = page * perPage;
        retorno.total = propostas.length;
        retorno.propostas = propostas.slice(inicio, fim);
        return retorno;
      })
      .catch(this.handlerError);
  }

  private handlerError(error: any): Promise<any> {
    console.log('Ocorreu um erro: ', error);
    return Promise.reject(error.message || error);
  }
}
