import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-menu-general',
  templateUrl: './general-form-menu.component.html',
  styleUrls: ['./general-form-menu.component.scss']
})
export class GeneralFormMenuComponent {

  /**
   *evento botón
   *
   * @type {GeneralFormMenu}
   * @memberof GeneralFormMenuComponent
   */
   @Output() emitButton: EventEmitter<string> = new EventEmitter<string>();

  /**
   *Emision del boton
   *
   * @param {GeneralFormMenu} btn
   * @memberof GeneralFormMenuComponent
   */
  emitButtonMenu(btn: string) {
    this.emitButton.emit(btn)

  }
}
