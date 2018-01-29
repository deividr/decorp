import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appHighlightMouse]'
})
export class HighlightMouseDirective {

  backgroundColor: string;

  constructor() { }

  @HostListener('mouseenter') onmouseenter() {
    this.backgroundColor = 'yellow';
  }

  @HostListener('mouseleave') onmouseleave() {
    this.backgroundColor = 'white';
  }

  @HostBinding('style.backgroundColor') get setColor() {
    return this.backgroundColor;
  }

}
