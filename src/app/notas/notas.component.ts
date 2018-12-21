import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Nota, Proposta } from '../model/models';
import { NotasService } from './notas.service';
import { PropostasService } from '../propostas/propostas.service';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css']
})
export class NotasComponent implements OnInit {
  title = 'Notas';
  private notas: Nota[];
  private propostaId: string;
  private proposta: Proposta;
  private dataInicial: string;
  private dataFinal: string;
  private valorTotal: number;
  private perPage = 5;
  private page = 1;
  private total = 10;
  private loading = false;
  private filter: string;
  private mensagem: String;
  private mensagemErro: String;

  constructor(
    private notasService: NotasService,
    private propostasService: PropostasService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.mensagem = this.notasService.getMensagem();
    this.mensagemErro = this.notasService.getMensagemErro();

    this.activatedRoute.queryParamMap.subscribe(
      params => {
        this.propostaId = params.get('proposta');

        if (this.propostaId) {
          this.propostasService.getProposta(this.propostaId)
            .subscribe(proposta => this.proposta = proposta);
        }

        this.filter = params.get('filter');
        this.dataInicial = params.get('dataInicial');
        this.dataFinal = params.get('dataFinal');
        this.restartSearch();
      }
    );
  }

  onNext(): void {
    this.page++;
    this.getNotas();
  }

  onPrev(): void {
    this.page--;
    this.getNotas();
  }

  onPage(page: number): void {
    this.page = page;
    this.getNotas();
  }

  restartSearch() {
    this.page = 1;
    this.getTotalNotas();
    this.getNotas();
    this.getValorTotal();
  }

  clearSearch() {
    this.filter = '';
    this.dataInicial = '';
    this.dataFinal = '';
    this.restartSearch();
  }

  getNotas(): void {
    this.loading = true;
    const skip = (this.page * this.perPage) - this.perPage;

    this.notasService.getNotas(
      {
        filter: this.filter,
        propostaId: this.propostaId,
        dataInicial: this.dataInicial,
        dataFinal: this.dataFinal,
        limit: this.perPage,
        skip: skip
      }
    ).subscribe(notas => {
      this.notas = notas;
      this.loading = false;
    });

    this.formatarURL();
  }

  formatarURL() {
    const queryParams = {};

    if (this.filter) {
      queryParams['filter'] = this.filter;
    }

    if (this.propostaId) {
      queryParams['proposta'] = this.propostaId;
    }

    if (!this.dataInicial) {
      // Se data inicial não informada, será formatado o primeiro dia do ano atual
      // como padrão para formar a lista.
      const date = new Date();
      date.setMonth(0); // Forçar Janeiro
      date.setDate(1); // Forçar o Primeiro Dia.
      this.dataInicial = date.toISOString().slice(0, 10);
    }

    queryParams['dataInicial'] = this.dataInicial;

    if (this.dataFinal) {
      queryParams['dataFinal'] = this.dataFinal;
    }

    this.router.navigate(['/notas'], { queryParams: queryParams });
  }

  getTotalNotas(): void {
    this.notasService.getTotalNotas(
      {
        filter: this.filter,
        propostaId: this.propostaId,
        dataInicial: this.dataInicial,
        dataFinal: this.dataFinal
      }
    ).subscribe(data => this.total = data.total);
  }

  getValorTotal(): void {
    this.notasService.getValorTotal(
      {
        filter: this.filter,
        propostaId: this.propostaId,
        dataInicial: this.dataInicial,
        dataFinal: this.dataFinal
      }
    ).subscribe(data => this.valorTotal = data.valorTotal);
  }

  goToNota(id: String) {
    this.router.navigate(['/notas', id]);
  }

  get temNotas() {
    if (this.notas) { return this.notas.length > 0; }
  }

}
