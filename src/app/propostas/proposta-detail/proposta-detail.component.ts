import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Proposta } from '../../model/models';
import { PropostasService } from '../propostas.service';
import { Location } from '@angular/common';
import { ElementRef } from '@angular/core';
import { NotasService } from '../../notas/notas.service';

@Component({
  selector: 'app-proposta-detail',
  templateUrl: './proposta-detail.component.html',
  styleUrls: ['./proposta-detail.component.css']
})
export class PropostaDetailComponent implements OnInit {
  @ViewChild('closeModal') private closeModal: ElementRef;
  private proposta: Proposta;
  private totalNotas: Number;
  private mensagem: String;
  private mensagemErro: String;
  private loading: Boolean;

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private propostasService: PropostasService,
    private notasService: NotasService
  ) { }

  ngOnInit() {
    this.mensagem = this.propostasService.getMensagem();
    this.mensagemErro = this.propostasService.getMensagemErro();
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.notasService.getTotalNotas({ propostaId: id }).subscribe(data => this.totalNotas = data.total);
    this.propostasService.getProposta(id).subscribe(proposta => this.proposta = proposta);
  }

  excluir() {
    this.loading = true;
    this.propostasService.delete(this.proposta).subscribe(() => {
      this.loading = false;
      this.closeModal.nativeElement.click();
      this.goBack();
    });
  }

  obterDataInicio(): String {
    return this.proposta.dataInicio ? this.proposta.dataInicio.toString().substr(0, 10) : '';
  }

  obterDataFim(): String {
    return this.proposta.dataFim ? this.proposta.dataFim.toString().substr(0, 10) : '';
  }

  goBack() {
    this.location.back();
  }

}
