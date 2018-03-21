import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Proposta } from '../model/models';
import { PropostasService } from './propostas.service';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { ParamMap } from '@angular/router/src/shared';
import { Subscription } from 'rxjs/Subscription';

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
  private filter: String;
  private mensagem: String;
  private mensagemErro: String;
  private inscricaoMensagem: Subscription;

  constructor(
    private propostasService: PropostasService,
    private router: Router,
    private activatedeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.mensagem = this.propostasService.getMensagem();
    this.mensagemErro = this.propostasService.getMensagemErro();

    this.activatedeRoute.queryParamMap.subscribe(params => {
      this.filter = params.get('filter');
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
    this.page = 1;
    this.getTotalPropostas();
    this.getPropostas();
  }

  getPropostas(): void {
    this.loading = true;
    const skip = (this.page * this.perPage) - this.perPage;

    this.propostasService.getPropostas(this.filter, this.perPage, skip)
      .subscribe(propostas => {
        this.propostas = propostas;
        this.loading = false;
      });

    if (this.filter) {
      this.router.navigate(['/propostas'], { queryParams: { filter: this.filter } });
    } else {
      this.router.navigate(['/propostas']);
    }
  }

  getTotalPropostas(): void {
    this.propostasService.getTotalPropostas(this.filter)
      .subscribe(data => this.total = data.total);
  }

  goToProposta(id: String) {
    this.router.navigate(['/propostas', id]);
  }

  get temPropostas() {
    if (this.propostas) { return this.propostas.length > 0; }
  }

}
