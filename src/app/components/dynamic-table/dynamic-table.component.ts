import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
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
  @Input() columns:  Columns[] = [];

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
}
