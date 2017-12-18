import { Component, OnInit } from '@angular/core';

import { Proposta } from '../model/models';
import { PropostaService } from '../service/proposta.service';

import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-proposta',
  templateUrl: './propostas.component.html',
  styleUrls: ['./propostas.component.css']
})
export class PropostasComponent implements OnInit {
  title = 'Propostas';
  private propostas: Proposta[];
  private perPage = 5;
  private page = 1;
  private total = 10;
  private loading = false;
  private filter: string;

  constructor(private propostaService: PropostaService) { }

  ngOnInit() {
    this.getPropostas();
  }

  onNext(): void {
    this.page++;
    this.getPropostas();
  }

  onPrev(): void {
    this.page--;
    this.getPropostas();
  }

  onPage(page: number): void {
    this.page = page;
    this.getPropostas();
  }

  getPropostas(): void {
    this.loading = true;
    this.propostaService.getPropostas()
      .subscribe(propostas => this.formatarLista(propostas));
  }

  searchPropostas() {
    this.loading = true;
    this.propostaService.search(this.filter).toPromise().then(propostas => this.formatarLista(propostas));
  }

  private formatarLista(propostas: Proposta[]) {
    const retorno = { total: 0, propostas: [] };
    const inicio = this.page * this.perPage - this.perPage;
    const fim = this.page * this.perPage;
    this.total = propostas.length;
    this.propostas = propostas.slice(inicio, fim);
    this.loading = false;
  }

  filtrar() {
    this.getPropostas();
  }
}
