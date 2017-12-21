import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Proposta } from '../../model/models';
import { PropostaService } from '../proposta.service';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { ParamMap } from '@angular/router/src/shared';

@Component({
  selector: 'app-proposta-list',
  templateUrl: './proposta-list.component.html',
  styleUrls: ['./proposta-list.component.css']
})
export class PropostaListComponent implements OnInit {
  title = 'Propostas';
  private propostas: Proposta[];
  private perPage = 5;
  private page = 1;
  private total = 10;
  private loading = false;
  private filter: string;

  constructor(
    private propostaService: PropostaService,
    private router: Router,
    private activatedeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedeRoute.queryParamMap.subscribe(params => {
      this.filter = params.get('filter');
    });
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

    if (this.filter) {
      this.propostaService.search(this.filter)
        .toPromise()
        .then(propostas => this.formatarLista(propostas));
      this.router.navigate(['/propostas'], { queryParams: { filter: this.filter } });
    } else {
      this.propostaService.getPropostas()
        .subscribe(propostas => this.formatarLista(propostas));
      this.router.navigate(['/propostas']);
    }
  }

  private formatarLista(propostas: Proposta[]) {
    const inicio = this.page * this.perPage - this.perPage;
    const fim = this.page * this.perPage;
    this.total = propostas.length;
    this.propostas = propostas.slice(inicio, fim);
    this.loading = false;
  }

  goToProposta(id: number) {
    this.router.navigate(['/propostas', id]);
  }

  get temPropostas() {
    if (this.propostas) { return this.propostas.length > 0; }
  }
}
