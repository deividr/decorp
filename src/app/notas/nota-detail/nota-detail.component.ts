import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Nota } from '../../model/models';
import { NotasService } from '../notas.service';
import { Location } from '@angular/common';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-nota-detail',
  templateUrl: './nota-detail.component.html',
  styleUrls: ['./nota-detail.component.css']
})
export class NotaDetailComponent implements OnInit {
  @ViewChild('closeModal') private closeModal: ElementRef;
  private nota: Nota;
  private mensagem: String;
  private mensagemErro: String;
  private loading: Boolean;

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private notasService: NotasService
  ) { }

  ngOnInit() {
    this.mensagem = this.notasService.getMensagem();
    this.mensagemErro = this.notasService.getMensagemErro();
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.notasService.getNota(id).subscribe(nota => this.nota = nota);
  }

  excluir() {
    this.loading = true;
    this.notasService.delete(this.nota).subscribe(() => {
      this.loading = false;
      this.closeModal.nativeElement.click();
      this.goBack();
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
