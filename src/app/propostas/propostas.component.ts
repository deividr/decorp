import { Component, OnInit } from '@angular/core';

import { Proposta } from '../model/models';
import { PropostaService } from '../service/proposta.service';

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
    this.propostaService.getPropostas(this.page, this.perPage, this.filter).then(retorno => {
      this.total = retorno['total'];
      this.propostas = retorno['propostas'];
      this.loading = false;
    });
  }

  filtrar() {
    this.getPropostas();
  }
}
