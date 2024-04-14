import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appAddPrefix]'
})
export class AddPrefixDirective {
  @Input() prefix: string = ''; // Prefijo predeterminado

  constructor() { }

  @HostListener('input', ['$event']) onInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;
    
    // Si el valor no comienza con el prefijo, agregarlo al principio
    if (!inputValue.startsWith(this.prefix)) {
      inputElement.value = this.prefix + inputValue;
      inputElement.setSelectionRange(this.prefix.length + 1 , this.prefix.length + 1 ); // Colocar el cursor al final del prefijo
    }
  }

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    const inputElement = event.target as HTMLInputElement;
    const selectionStart = inputElement.selectionStart;

    // Si el usuario intenta eliminar el prefijo, evitarlo
    if (selectionStart as any <= this.prefix.length && (event.key === 'Backspace' || event.key === 'Delete')) {
      event.preventDefault();
    }
  }

}
