import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
    private router: Router,
    private propostasService: PropostasService,
    private notasService: NotasService
  ) { }

  ngOnInit() {
    this.mensagem = this.propostasService.getMensagem();
    this.mensagemErro = this.propostasService.getMensagemErro();
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.notasService.getTotalNotas({propostaId: id}).subscribe(data => this.totalNotas = data.total);
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

  goBack() {
    this.location.back();
  }

}
