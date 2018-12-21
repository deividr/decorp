import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Nota, Proposta } from '../../model/models';
import { NotasService } from '../notas.service';
import { Location } from '@angular/common';
import { ElementRef } from '@angular/core';
import { PropostasService } from '../../propostas/propostas.service';

@Component({
  selector: 'app-nota-detail',
  templateUrl: './nota-detail.component.html',
  styleUrls: ['./nota-detail.component.css']
})
export class NotaDetailComponent implements OnInit {
  @ViewChild('closeModal') private closeModal: ElementRef;
  private nota: Nota;
  private proposta: Proposta;
  private mensagem: String;
  private mensagemErro: String;
  private loading: Boolean;

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private notasService: NotasService,
    private propostasService: PropostasService
  ) { }

  ngOnInit() {
    this.mensagem = this.notasService.getMensagem();
    this.mensagemErro = this.notasService.getMensagemErro();
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.notasService.getNota(id).subscribe(nota => this.nota = nota);
  }

  excluir() {
    this.loading = true;
    this.proposta = this.nota.proposta;

    this.notasService.delete(this.nota).subscribe(() => {
      this.loading = false;
      this.closeModal.nativeElement.click();
      this.updateProposta();
      this.goBack();
    });
  }

  updateProposta() {
    this.notasService.getTotalNotas({propostaId: this.proposta._id.toString()}).subscribe(data => {
      if (data.total === 0) {
        // Se não existe mais notas, marcar como "a receber"
        this.proposta.recebimento = 2;
        this.propostasService.update(this.proposta).subscribe();
      } else if (this.proposta.qtdeParcelas > data.total) {
        // Se já existe notas, marcar como "recebendo".
        this.proposta.recebimento = 1;
        this.propostasService.update(this.proposta).subscribe();
      }
    });
  }

  getImposto() {
    return this.notasService.getImposto(this.nota.valor);
  }

  getDescricaoNota() {
    return this.notasService.getDescricaoNota(this.nota.valor);
  }

  goBack() {
    this.location.back();
  }

}
