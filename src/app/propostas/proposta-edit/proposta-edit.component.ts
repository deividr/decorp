import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PropostasService } from '../propostas.service';
import { Proposta, Fase } from '../../model/models';
import { Location } from '@angular/common';

@Component({
  selector: 'app-proposta-edit',
  templateUrl: './proposta-edit.component.html',
  styleUrls: ['./proposta-edit.component.css']
})
export class PropostaEditComponent implements OnInit {
  private proposta: Proposta;
  private propostaForm: FormGroup;
  private loading: Boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private propostaService: PropostasService,
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.propostaService.getProposta(id).subscribe(proposta => {
      this.proposta = proposta;
      console.log(this.proposta);
      this.resetForm();
    });
  }

  createForm() {
    this.propostaForm = this.formBuilder.group({
      numero: ['', [Validators.required, Validators.maxLength(20)]],
      descricao: ['', [Validators.required, Validators.minLength(10)]],
      dataInicio: '',
      dataFim: '',
      qtdeHoras: 0,
      fase: [Fase[0], Validators.required],
      empresa: ['', Validators.required],
      observacoes: ''
    });
  }

  resetForm() {
    this.propostaForm.reset({
      numero: this.proposta.numero,
      descricao: this.proposta.descricao,
      dataInicio: this.proposta.dataInicio,
      dataFim: this.proposta.dataFim,
      qtdeHoras: this.proposta.qtdeHoras,
      fase: this.proposta.fase,
      empresa: this.proposta.empresa,
      observacoes: this.proposta.observacoes
    });
  }

  onSubmit() {
    this.proposta = this.prepararProposta();
    this.loading = true;
    this.propostaService.update(this.proposta).subscribe(() => {
      this.goBack();
      this.loading = false;
    });
    this.resetForm();
  }

  prepararProposta(): Proposta {
    const formModel = this.propostaForm.value;

    const saveProposta: Proposta = {
      _id: this.proposta._id,
      numero: formModel.numero,
      descricao: formModel.descricao,
      dataInicio: formModel.dataInicio,
      dataFim: formModel.dataFim,
      qtdeHoras: formModel.qtdeHoras,
      fase: formModel.fase,
      empresa: formModel.empresa,
      observacoes: formModel.observacoes
    };

    return saveProposta;
  }

  get fases() {
    return Object.keys(Fase).filter(k => typeof Fase[k as any] === 'number');
  }

  get numero() {
    return this.propostaForm.get('numero');
  }

  get descricao() {
    return this.propostaForm.get('descricao');
  }

  get dataInicio() {
    return this.propostaForm.get('dataInicio');
  }

  get dataFim() {
    return this.propostaForm.get('dataFim');
  }

  get qtdeHoras() {
    return this.propostaForm.get('qtdeHoras');
  }

  get fase() {
    return this.propostaForm.get('fase');
  }

  get empresa() {
    return this.propostaForm.get('empresa');
  }

  get observacoes() {
    return this.propostaForm.get('observacoes');
  }

  goBack() {
    this.location.back();
  }
}
