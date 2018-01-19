import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropostasService } from '../propostas.service';
import { Proposta } from '../../model/models';
import { Location } from '@angular/common';

@Component({
  selector: 'app-proposta-edit',
  templateUrl: './proposta-edit.component.html',
  styleUrls: ['./proposta-edit.component.css']
})
export class PropostaEditComponent implements OnInit {
  proposta: Proposta;

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private propostaService: PropostasService
  ) { }

  ngOnInit() {
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.propostaService.getProposta(id).subscribe(proposta => this.proposta = proposta);
  }

  goBack() {
    this.location.back();
  }
}
