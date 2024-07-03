import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[textUppercase]'
})
export class TextUppercaseDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.toUpperCase();
    this.el.nativeElement.value = input.value;
  }
}
