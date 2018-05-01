import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Nota, Proposta } from '../../model/models';
import { NotasService } from '../notas.service';
import { PropostasService } from '../../propostas/propostas.service';

@Component({
  selector: 'app-nota-new',
  templateUrl: './nota-new.component.html',
  styleUrls: ['./nota-new.component.css']
})
export class NotaNewComponent implements OnInit {
  private nota: Nota;
  private propostas: Proposta[];
  private notaForm: FormGroup;
  private loading: Boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private notaService: NotasService,
    private propostaService: PropostasService,
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.propostaService.getPropostas('', 100, 0).subscribe(propostas => this.propostas = propostas);

    this.resetForm();
  }

  createForm() {
    this.notaForm = this.formBuilder.group({
      numero: [0, Validators.required],
      empresa: ['', Validators.required],
      dataEmissao: ['', Validators.required],
      dataFatura: '',
      valor: [0, Validators.required],
      proposta: ['', Validators.required],
      faturada: [false, Validators.required]
    });
  }

  resetForm() {
    this.notaForm.reset({
      numero: 0,
      empresa: '',
      dataEmissao: null,
      dataFatura: null,
      valor: 0,
      proposta: '',
      faturada: false
    });
  }

  onSubmit() {
    this.nota = this.prepararNota();
    this.loading = true;

    this.notaService.insert(this.nota).subscribe(() => {
      this.goBack();
      this.loading = false;
    });

    this.resetForm();
  }

  prepararNota(): Nota {
    const formModel = this.notaForm.value;

    const dataEmissao = new Date(
      +formModel.dataEmissao.substr(0, 4),
      +formModel.dataEmissao.substr(5, 2) - 1,
      +formModel.dataEmissao.substr(8, 2)
    );

    const dataFatura = new Date(
      +formModel.dataFatura.substr(0, 4),
      +formModel.dataFatura.substr(5, 2) - 1,
      +formModel.dataFatura.substr(8, 2)
    );

    const saveNota: Nota = {
      _id: null,
      numero: formModel.numero,
      empresa: formModel.empresa,
      dataEmissao: dataEmissao,
      dataFatura: dataFatura,
      valor: formModel.valor,
      proposta: formModel.proposta._id,
      faturada: formModel.faturada
    };

    return saveNota;
  }

  get numero() {
    return this.notaForm.get('numero');
  }

  get empresa() {
    return this.notaForm.get('empresa');
  }

  get dataEmissao() {
    return this.notaForm.get('dataEmissao');
  }

  get dataFatura() {
    return this.notaForm.get('dataFatura');
  }

  get valor() {
    return this.notaForm.get('valor');
  }

  get proposta() {
    return this.notaForm.get('proposta');
  }

  get faturada() {
    return this.notaForm.get('faturada');
  }

  byId(p1: Proposta, p2: Proposta) {
    return p1._id === p2._id;
  }

  goBack() {
    this.location.back();
  }
}
