import { Component, OnInit } from '@angular/core';
import { Nota } from '../model/models';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css']
})
export class NotasComponent implements OnInit {
  title = 'Notas';
  private propostas: Nota[];
  private perPage = 5;
  private page = 1;
  private total = 10;
  private loading = false;
  private filter: String;
  private mensagem: String;
  private mensagemErro: String;
  constructor() { }

  ngOnInit() {
  }

  onNext(): void {
    this.page++;
    this.getPropostas();
  }

  onPrev(): void {
    this.page--;
    this.getPropostas();
  }

  onPage(page: number): void {
    this.page = page;
    this.getPropostas();
  }
  restartSearch() {
    this.page = 1;
    this.getTotalPropostas();
    this.getPropostas();
  }

  getPropostas(): void {
    this.loading = true;
    const skip = (this.page * this.perPage) - this.perPage;

    this.propostasService.getPropostas(this.filter, this.perPage, skip)
      .subscribe(propostas => {
        this.propostas = propostas;
        this.loading = false;
      });

    if (this.filter) {
      this.router.navigate(['/propostas'], { queryParams: { filter: this.filter } });
    } else {
      this.router.navigate(['/propostas']);
    }
  }

  getTotalPropostas(): void {
    this.propostasService.getTotalPropostas(this.filter)
      .subscribe(data => this.total = data.total);
  }

  goToProposta(id: String) {
    this.router.navigate(['/propostas', id]);
  }

  get temPropostas() {
    if (this.propostas) { return this.propostas.length > 0; }
  }

}
