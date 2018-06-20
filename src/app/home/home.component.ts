import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotasService } from '../notas/notas.service';
import { Observable } from 'rxjs/Observable';
import { PropostasService } from '../propostas/propostas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private impostoMesAtual: number;
  private impostoMesAnterior: number;
  private valorBruto: number;
  private valorLiquido: number;

  constructor(
    private router: Router,
    private notasService: NotasService,
    private propostasService: PropostasService
  ) { }

  ngOnInit() {
    this.getImpostoMesAtual();
    this.getImpostoMesAnterior();
    this.getValores();
  }

  getImpostoMesAtual() {
    const dataInicial = new Date();
    dataInicial.setDate(1);
    const dataFinal = new Date();

    this.notasService.getTotalImpostos(dataInicial, dataFinal)
      .subscribe(data => this.impostoMesAtual = data.valorTotal);
  }

  getImpostoMesAnterior() {
    const dataInicial = new Date();
    dataInicial.setDate(1);
    dataInicial.setMonth(dataInicial.getMonth() - 1);

    const dataFinal = new Date();
    dataFinal.setDate(0);

    this.notasService.getTotalImpostos(dataInicial, dataFinal)
      .subscribe(data => this.impostoMesAnterior = data.valorTotal);
  }

  getValores() {
    Observable.zip(
      this.notasService.getValoresRecebidos(),
      this.propostasService.getValorTotalPrevisto(),
      (notasValores, propostasValores) => ({ notasValores, propostasValores })
    ).subscribe(({ notasValores, propostasValores }) => {
      this.valorBruto = propostasValores.valorTotalPrevisto - notasValores.valorRecebido;
      this.valorLiquido = this.valorBruto - (this.valorBruto * this.notasService.perImposto);
    });
  }

  get mesAtual() {
    const mesAtual = new Date().toLocaleDateString('pt-br', { month: 'long' });

    return mesAtual.charAt(0).toUpperCase() + mesAtual.substr(1).toLowerCase();
  }

  get mesAnterior() {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    const mesAnterior = date.toLocaleDateString('pt-br', { month: 'long' });

    return mesAnterior.charAt(0).toUpperCase() + mesAnterior.substr(1).toLowerCase();
  }

  gotoNotas() {
    const dataInicial = new Date();
    dataInicial.setDate(1);
    dataInicial.setMonth(dataInicial.getMonth() - 1);

    const dataFinal = new Date();

    const queryParams = {
      'dataInicial': dataInicial.toISOString().slice(0, 10),
      'dataFinal': dataFinal.toISOString().slice(0, 10)
    };

    this.router.navigate(['/notas'], { queryParams: queryParams });
  }

  gotoPropostas() {
    this.router.navigate(['propostas'], { queryParams: null });
  }
}
