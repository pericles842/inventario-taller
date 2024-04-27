import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
import { Columns } from 'src/app/interfaces/ConfigsFormsData.interface';
import { Usuario } from 'src/app/modules/usuarios/models/UsuariosModel';
import { InputFormsComponent } from "../input-forms/input-forms.component";
import { FormsModule } from '@angular/forms';


@Component({
  standalone: true,
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss'],
  imports: [
    CommonModule,
    InputFormsComponent,
    FormsModule
  ]
})
export class DynamicTableComponent {

  search: string = ''
  filters: boolean = false
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

  cloneRecords: any[] = this.records
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

  /**
   *Ver boton agreggar
   *
   * @type {Boolean}
   * @memberof DynamicTableComponent
   */
  @Input() viewBtnAdd: Boolean = false

  @Input() disabledBtnAdd: Boolean = false


  /**
   *Ver boton eliminar
   *
   * @type {boolean}
   * @memberof DynamicTableComponent
   */
  @Input() viewBtnDelete: boolean = false
  /**
   *Activa el modo de tabla selecciable
   *
   * @type {Boolean}
   * @memberof DynamicTableComponent
   */
  @Input() selectable_table: Boolean = false

  /**
   *item seleccionado
   *
   * @type {EventEmitter<Usuario>}
   * @memberof DynamicTableComponent
   */
  @Output() selectItem: EventEmitter<any> = new EventEmitter()

  /**
   *boton elminar
   *
   * @type {EventEmitter<any>}
   * @memberof DynamicTableComponent
   */
  @Output() btnDelete: EventEmitter<any> = new EventEmitter()


  /**
   *Emitir botón agregar
   *
   * @type {EventEmitter<boolean>}
   * @memberof DynamicTableComponent
   */
  @Output() btnAdd: EventEmitter<boolean> = new EventEmitter()
  /**
   *Evento del boton para confirmar los items seleccinados
   *
   * @type {EventEmitter<boolean>}
   * @memberof DynamicTableComponent
   */
  @Output() selectBtnChecks: EventEmitter<any[]> = new EventEmitter()

  /**
   *Seleccionar todos los registros en caos de tabla seeccioable
   *
   * @type {boolean}
   * @memberof DynamicTableComponent
   */
  selectedAllChecks: boolean = false

  /**
   *Items seleccionados por el check
   *
   * @type {any[]}
   * @memberof DynamicTableComponent
   */
  itemsSelected: any[] = []



  constructor(
    private renderer: Renderer2
  ) { }

  filterTableRecords(event: any) {

    if (!this.search.trim()) this.records = this.cloneRecords;

    this.records = this.records.filter(item => {
      return item.id == parseInt(event) || item.name_user == event || item.ci == parseInt(event);
    });

  }
  /**
   *Este metodo dinamico abre el modal si el mismo no esta abierto pero si esta abierto lo cerrara
   *
   * @memberof DynamicTableComponent
   */
  openAndCloseModal() {
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
  /**
   *Agregga interactivamente registros de la tabla
   *
   * @param {*} item
   * @memberof DynamicTableComponent
   */
  addItemCheck(item: any) {
    //!REFACTORIZAR LOS RECORDS DE LA TABLA SE DEBERIAN ELIMNAR DESDE ESTE COMPONENTE
    if (item == undefined) {
      //para la visualizacion de chenk en la tabla
      this.records.forEach(item => item.check = this.selectedAllChecks)


      this.records.forEach(item => {

        if (item.check) {
          this.itemsSelected.push(item)

        } else {
          let index = this.itemsSelected.findIndex(i => i.id == item.id)
          this.itemsSelected.splice(index, 1)

        }
      })
      return
    }

    if (item.check) {
      this.itemsSelected.push(item)
    } else {

      let index = this.itemsSelected.findIndex(i => i.id == item.id)
      this.itemsSelected.splice(index, 1)
    }

  }

  /**
   *Acción de botón confirmar los cheks
   *
   * @memberof DynamicTableComponent
   */
  acceptChecks() {
    this.selectedAllChecks = false
    this.selectBtnChecks.emit(this.itemsSelected)
    this.itemsSelected = []
    this.openAndCloseModal()
  }

}
