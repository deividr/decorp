import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotasService } from '../notas.service';
import { Nota, Proposta } from '../../model/models';
import { Location } from '@angular/common';
import { PropostasService } from '../../propostas/propostas.service';

@Component({
  selector: 'app-nota-edit',
  templateUrl: './nota-edit.component.html',
  styleUrls: ['./nota-edit.component.css']
})
export class NotaEditComponent implements OnInit {
  private nota: Nota;
  private propostas: Proposta[];
  private notaForm: FormGroup;
  private loading: Boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private notasService: NotasService,
    private propostasService: PropostasService,
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.propostasService.getPropostas({ recebimento: '1,2' })
      .subscribe(propostas => this.propostas = propostas);

    this.notasService.getNota(id)
      .subscribe(nota => {
        this.nota = nota;

        // Se a proposta já recebida por completo, obter a proposta porque senão não vai aparecer na lista.
        if (this.nota.proposta.recebimento === 0) {
          this.propostasService.getProposta(this.nota.proposta._id)
            .subscribe(proposta => this.propostas.push(proposta));
        }

        this.resetForm();
      });
  }

  createForm() {
    this.notaForm = this.formBuilder.group({
      numero: [0, Validators.required],
      empresa: ['', Validators.required],
      dataEmissao: [Date.now, Validators.required],
      dataFatura: Date.now,
      valor: [0, Validators.required],
      proposta: ['', Validators.required],
      faturada: [0, Validators.required]
    });
  }

  resetForm() {
    this.notaForm.reset({
      numero: this.nota.numero,
      empresa: this.nota.empresa,
      dataEmissao: this.nota.dataEmissao.toString().substr(0, 10),
      dataFatura: this.nota.dataFatura.toString().substr(0, 10),
      valor: this.nota.valor,
      proposta: this.nota.proposta,
      faturada: this.nota.faturada
    });
  }

  onSubmit() {
    this.nota = this.prepararNota();
    this.loading = true;

    this.notasService.update(this.nota).subscribe(() => {
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
      _id: this.nota._id,
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
