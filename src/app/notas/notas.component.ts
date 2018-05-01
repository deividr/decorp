import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Nota } from '../model/models';
import { NotasService } from './notas.service';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css']
})
export class NotasComponent implements OnInit {
  title = 'Notas';
  private notas: Nota[];
  private propostaId: String;
  private perPage = 5;
  private page = 1;
  private total = 10;
  private loading = false;
  private filter: String;
  private mensagem: String;
  private mensagemErro: String;

  constructor(
    private notasService: NotasService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.mensagem = this.notasService.getMensagem();
    this.mensagemErro = this.notasService.getMensagemErro();

    this.activatedRoute.queryParamMap.subscribe(params => {
      this.propostaId = params.get('proposta');
      this.filter = params.get('filter');
    });

    this.restartSearch();
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
  }

  getNotas(): void {
    this.loading = true;
    const skip = (this.page * this.perPage) - this.perPage;

    this.notasService.getNotas(this.filter, this.propostaId, this.perPage, skip)
      .subscribe(notas => {
        this.notas = notas;
        this.loading = false;
      });

    const queryParams = {};

    if (this.filter) {
      queryParams['filter'] = this.filter;
    }

    if (this.propostaId) {
      queryParams['proposta'] = this.propostaId;
    }

    this.router.navigate(['/notas'], { queryParams: queryParams });
  }

  getTotalNotas(): void {
    this.notasService.getTotalNotas(this.filter, this.propostaId)
      .subscribe(data => this.total = data.total);
  }

  goToNota(id: String) {
    this.router.navigate(['/notas', id]);
  }

  get temNotas() {
    if (this.notas) { return this.notas.length > 0; }
  }

}
