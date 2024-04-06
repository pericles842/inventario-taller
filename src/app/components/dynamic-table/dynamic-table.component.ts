import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
import { Columns } from 'src/app/interfaces/ConfigsFormsData.interface';

@Component({
  standalone: true,
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss'],
  imports: [
    CommonModule
  ]
})
export class DynamicTableComponent {

  /**
   *Columnas de la tabla importante definir correctamente el key
   *
   * @type {Columns[]}
   * @memberof DynamicTableComponent
   */
  @Input() columns: Columns[] = [];

  /**
   *Registros de la tabla
   *
   * @type {any[]}
   * @memberof DynamicTableComponent
   */
  @Input() records: any[] = []

  /**
   *Titulo del modal
   *
   * @type {string}
   * @memberof DynamicTableComponent
   */
  @Input() titleModal: string = ''

  /**
   *Tipo de tabla
   *
   * @type {('modal' | 'table')}
   * @memberof DynamicTableComponent
   */
  @Input() type_table: 'modal' | 'table' = 'modal';
  

  constructor(
    private renderer: Renderer2
  ) { }

  /**
   * Abrir modal
   *
   * @memberof DynamicTableComponent
   */
  openModal() {
    //Crear un nuevo div
    const div = this.renderer.createElement('div');

    //Añadir los atributos necesarios para abrir el modal
    this.renderer.setAttribute(div, 'data-bs-toggle', 'modal');
    this.renderer.setAttribute(div, 'data-bs-target', '#exampleModal');
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
