import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {

  @Input() private page: number;
  @Input() private count: number;
  @Input() private perPage: number;
  @Input() private loading: boolean;
  @Input() private pagesToShow: number;

  @Output() private goNext = new EventEmitter();
  @Output() private goPrev = new EventEmitter();
  @Output() private goPage = new EventEmitter<number>();

  constructor() {}

  onNext(): void {
    this.goNext.emit();
  }

  onPrev(): void {
    this.goPrev.emit();
  }

  onPage(page: number): void {
    this.goPage.emit(page);
  }

  lastPage(): boolean {
    return (this.page * this.perPage) >= this.count;
  }

  getPages(): number[] {
    const c = Math.ceil(this.count / this.perPage);
    const p = this.page || 1;
    const pagesToShow = this.pagesToShow || 9;
    const pages: number[] = [];
    pages.push(p);
    const times = pagesToShow - 1;
    for (let i = 0; i < times; i++) {
      if (pages.length < pagesToShow) {
        if (Math.min.apply(null, pages) > 1) {
          pages.push(Math.min.apply(null, pages) - 1);
        }
      }
      if (pages.length < pagesToShow) {
        if (Math.max.apply(null, pages) < c) {
          pages.push(Math.max.apply(null, pages) + 1);
        }
      }
    }
    pages.sort((a, b) => a - b);
    return pages;
    }
}
