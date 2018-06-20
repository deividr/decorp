import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Proposta, Fase } from '../../model/models';
import { PropostasService } from '../propostas.service';

@Component({
  selector: 'app-proposta-new',
  templateUrl: './proposta-new.component.html',
  styleUrls: ['./proposta-new.component.css']
})
export class PropostaNewComponent implements OnInit {

  private proposta: Proposta;
  private propostaForm: FormGroup;
  private loading: Boolean;

  constructor(
    private location: Location,
    private propostaService: PropostasService,
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.resetForm();
  }

  createForm() {
    this.propostaForm = this.formBuilder.group({
      numero: ['', [Validators.required, Validators.maxLength(20)]],
      descricao: ['', [Validators.required, Validators.minLength(10)]],
      dataInicio: null,
      dataFim: null,
      qtdeHoras: [0, Validators.required],
      qtdeParcelas: [0, Validators.required],
      valorEstimado: 0,
      fase: [Fase[0], Validators.required],
      empresa: ['', Validators.required],
      observacoes: '',
      recebimento: [2, Validators.required],
    });
  }

  resetForm() {
    this.propostaForm.reset({
      numero: '',
      descricao: '',
      dataInicio: null,
      dataFim: null,
      qtdeHoras: 0,
      qtdeParcelas: 0,
      valorEstimado: 0,
      fase: '',
      empresa: '',
      observacoes: '',
      recebimento: 2
    });
  }

  onSubmit() {
    this.proposta = this.prepararProposta();
    this.loading = true;

    this.propostaService.insert(this.proposta).subscribe(() => {
      this.goBack();
    });

    this.resetForm();
  }

  prepararProposta(): Proposta {
    const formModel = this.propostaForm.value;

    const dataInicio = new Date(
      +formModel.dataInicio.substr(0, 4),
      +formModel.dataInicio.substr(5, 2) - 1,
      +formModel.dataInicio.substr(8, 2)
    );

    const dataFim = new Date(
      +formModel.dataFim.substr(0, 4),
      +formModel.dataFim.substr(5, 2) - 1,
      +formModel.dataFim.substr(8, 2)
    );

    const saveProposta: Proposta = {
      _id: null,
      numero: formModel.numero,
      descricao: formModel.descricao,
      dataInicio: dataInicio,
      dataFim: dataFim,
      qtdeHoras: formModel.qtdeHoras,
      qtdeParcelas: formModel.qtdeParcelas,
      valorEstimado: formModel.valorEstimado,
      fase: formModel.fase,
      empresa: formModel.empresa,
      observacoes: formModel.observacoes,
      recebimento: formModel.recebimento
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

  get qtdeParcelas() {
    return this.propostaForm.get('qtdeParcelas');
  }

  get valorEstimado() {
    return this.propostaForm.get('valorEstimado');
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
