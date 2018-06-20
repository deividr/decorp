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
  private proximoNumero: number;
  private propostas: Proposta[];
  private notaForm: FormGroup;
  private loading: Boolean = false;
  private mensagem: String;
  private mensagemErro: String;

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private notaService: NotasService,
    private propostaService: PropostasService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.propostaService.getPropostas({ recebimento: '1,2' }).subscribe(propostas => this.propostas = propostas);

    this.notaService.getUltimaNota().subscribe(nota => {
      this.proximoNumero = nota.numero + 1;
      this.createForm();
    });
  }

  createForm() {
    const hoje = new Date().toISOString().slice(0, 10);

    this.notaForm = this.formBuilder.group({
      numero: [this.proximoNumero, Validators.required],
      empresa: ['', Validators.required],
      dataEmissao: [hoje, Validators.required],
      dataFatura: hoje,
      valor: [0, Validators.required],
      proposta: ['', Validators.required],
      faturada: [0, Validators.required]
    });
  }

  resetForm() {
    const hoje = new Date().toISOString().slice(0, 10);

    this.notaForm.reset({
      numero: this.proximoNumero,
      empresa: '',
      dataEmissao: hoje,
      dataFatura: hoje,
      valor: 0,
      proposta: '',
      faturada: 0
    });
  }

  onSubmit() {
    this.nota = this.prepararNota();
    const prpstaAtul: Proposta = this.notaForm.value.proposta;
    this.loading = true;

    this.notaService.insert(this.nota).subscribe(() => {
      this.proximoNumero = this.proximoNumero + 1;
      this.resetForm();
      this.mensagem = this.notaService.getMensagem();
      this.mensagemErro = this.notaService.getMensagemErro();
      this.loading = false;
      this.updateProposta(prpstaAtul);
    });
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

  updateProposta(proposta: Proposta) {
    this.notaService.getTotalNotas({ propostaId: proposta._id.toString() }).subscribe(data => {
      if (data.total === proposta.qtdeParcelas) {
        // Se quantidade total é igual a quantidade parcelas, recebimento está completo
        proposta.recebimento = 0;
      } else {
        // Senão recebimento está em andamento
        proposta.recebimento = 1;
      }

      this.propostaService.update(proposta).subscribe();
    });
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
