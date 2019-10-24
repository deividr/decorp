import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Proposta } from '../model/models';
import { PropostasService } from './propostas.service';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-propostas',
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
  private recebimento: string;
  private mensagem: String;
  private mensagemErro: String;

  constructor(
    private propostasService: PropostasService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.mensagem = this.propostasService.getMensagem();
    this.mensagemErro = this.propostasService.getMensagemErro();

    this.activatedRoute.queryParamMap.subscribe(params => {
      this.page = parseInt(params.get('page'), 0);

      // Se param page não existe, move 1.
      this.page = isNaN(this.page) ? 1 : this.page;

      this.filter = params.get('filter');
      this.recebimento = params.get('recebimento');
    });

    this.restartSearch();
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

  restartSearch() {
    this.getTotalPropostas();
    this.getPropostas();
  }

  clearSearch() {
    this.page = 1;
    this.filter = '';
    this.recebimento = null;
    this.restartSearch();
  }

  getPropostas(): void {
    this.loading = true;
    const skip = this.page * this.perPage - this.perPage;

    this.propostasService
      .getPropostas({
        filter: this.filter,
        recebimento: this.recebimento,
        limit: this.perPage,
        skip: skip
      })
      .subscribe(propostas => {
        this.propostas = propostas;
        this.loading = false;
      });

    const queryParams = { page: this.page };

    if (this.filter) {
      queryParams['filter'] = this.filter;
    }

    if (this.recebimento) {
      queryParams['recebimento'] = this.recebimento;
    }

    if (queryParams) {
      this.router.navigate(['/propostas'], { queryParams: queryParams });
    } else {
      this.router.navigate(['/propostas']);
    }
  }

  getTotalPropostas(): void {
    this.propostasService
      .getTotalPropostas({ filter: this.filter, recebimento: this.recebimento })
      .subscribe(data => (this.total = data.total));
  }

  goToProposta(id: String) {
    this.router.navigate(['/propostas', id]);
  }

  get temPropostas() {
    if (this.propostas) {
      return this.propostas.length > 0;
    }
  }
}
