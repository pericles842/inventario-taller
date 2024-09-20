import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, Renderer2 } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-dynamic-modal',
  templateUrl: './dynamic-modal.component.html',
  styleUrls: ['./dynamic-modal.component.scss'],
  imports: [CommonModule]
})
export class DynamicModalComponent {
  /**
   *tamano del modal
   *
   * @type {string}
   * @memberof DynamicModalComponent
   */
  @Input() modalSize: string = '60%';
  @Input() discardBtnLabel: string = 'Descartar'
  @Input() confirmBtnLabel: string = 'Guardar'

  @Input() title: string = ''
  /**
   *El modal se escapa con click
   *
   * @type {boolean}
   * @memberof DynamicModalComponent
   */
  @Input() backdropStatic: boolean = false

  /**
   *boton x de cerrar modal
   *
   * @type {boolean}
   * @memberof DynamicModalComponent
   */
  @Input() btnClose: boolean = false
  /**
   *Deshabilita el botón de descartar
   *
   * @type {boolean}
   * @memberof DynamicModalComponent
   */
  @Input() viewDiscardBtn: boolean = true

  /**
   * Deshabilita el botón de aceptar
   *
   * @type {boolean}
   * @memberof DynamicModalComponent
   */
  @Input() viewSaveBtn: boolean = true
  /**
   *emite el botón aceptar
   *
   * @type {EventEmitter<any>}
   * @memberof DynamicModalComponent
   */
  @Output() acceptBtn: EventEmitter<any> = new EventEmitter()
  /**
   *emite el boton de rechazar
   *
   * @type {EventEmitter<any>}
   * @memberof DynamicModalComponent
   */
  @Output() rejectBtn: EventEmitter<any> = new EventEmitter()

  constructor(private renderer: Renderer2) { }

  /**
   *abr ey cierra el modal
   *
   * @memberof DynamicModalComponent
   */
  openAndCloseModal() {
    //Crear un nuevo div
    const div = this.renderer.createElement('div');

    //Añadir los atributos necesarios para abrir el modal
    this.renderer.setAttribute(div, 'data-bs-toggle', 'modal');
    this.renderer.setAttribute(div, 'data-bs-target', '#exampleModalDynamic');
    // Añadir el div al body del documento
    this.renderer.appendChild(document.body, div);
    //Disparar el evento de clic en el div recién creado
    div.click();

    //Remover el div después de abrir el modal (opcional)
    setTimeout(() => {
      this.renderer.removeChild(document.body, div);
    }, 1000); // Ajusta el tiempo según sea necesario
  }
}
