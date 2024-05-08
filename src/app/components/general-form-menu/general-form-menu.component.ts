import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { GeneralFormMenu } from 'src/app/enum/general-form-menu';
import { Access } from 'src/app/models/Access';


@Component({
  standalone: true,
  selector: 'app-menu-general',
  templateUrl: './general-form-menu.component.html',
  styleUrls: ['./general-form-menu.component.scss'],
  imports: [
    CommonModule
  ]
})
export class GeneralFormMenuComponent implements OnChanges, OnInit {

  /**
   *Acceso de los botones
   *
   * @type {Access}
   * @memberof GeneralFormMenuComponent
   */
  @Input() access: Access = new Access()

  @Input()
  set type_view(value: number) {
    this._type_view = value;
    this.type_viewChange.emit(value); // Emitir el valor recibido inmediatamente
  }
  /**
   *lee type view
   *
   * @readonly
   * @type {number}
   * @memberof GeneralFormMenuComponent
   */
  get type_view(): number {
    return this._type_view;
  }
  
  private _type_view: number = 0;

  @Output() type_viewChange: EventEmitter<number> = new EventEmitter<number>()


  @Output() guardar: EventEmitter<GeneralFormMenu.create> = new EventEmitter<GeneralFormMenu.create>();
  // @Output() editar: EventEmitter<GeneralFormMenu.edit> = new EventEmitter<GeneralFormMenu.edit>();
  @Output() delete: EventEmitter<GeneralFormMenu.delete> = new EventEmitter<GeneralFormMenu.delete>();
  @Output() archivar: EventEmitter<GeneralFormMenu.file> = new EventEmitter<GeneralFormMenu.file>();
  @Output() search: EventEmitter<GeneralFormMenu.search> = new EventEmitter<GeneralFormMenu.search>();
  @Output() descartar: EventEmitter<GeneralFormMenu.descartar> = new EventEmitter<GeneralFormMenu.descartar>();

  protected view_buttons = {
    create: true,
    delete: true,
    archivar: true,
    search: true,
    descartar: true
  }
constructor(private cdr: ChangeDetectorRef){}
  ngOnInit(): void {
    this.presentation()
  }
  /**
   *Cambios del input
   *
   * @param {*} changes
   * @memberof GeneralFormMenuComponent
   */
  ngOnChanges(changes: any) {
    if ('type_view' in changes) {
      const cambio = changes.type_view;


      //? Valor anterior cambio.previousValue 
      //?  Valor actual cambio.currentValue 

      switch (this.type_view) {
        case 0:
          this.presentation()
          break;

        case 1:
          this.viewForm()
          break;
      }
    }
  }

  /**
   *menu en modo presentacion
   *
   * @memberof GeneralFormMenuComponent
   */
  protected presentation() {
    this.type_view = 0
    this.view_buttons = {
      create: true,
      delete: false,
      archivar: false,
      search: true,
      descartar: true
    }
  }

  protected viewForm() {
    this.type_view = 1
    this.view_buttons = {
      create: true,
      delete: true,
      archivar: true,
      search: true,
      descartar: true
    }
  }

  /**
   * procedimiento borrar
   *
   * @protected
   * @memberof GeneralFormMenuComponent
   */
  protected deleteInput() {
    this.presentation()
    this.delete.emit()
  }

  /**
   *Procedimiento arcvhivar
   * @protected
   * @memberof GeneralFormMenuComponent
   */
  protected archiveInput() {
    this.presentation()
    this.archivar.emit()
  }
}
