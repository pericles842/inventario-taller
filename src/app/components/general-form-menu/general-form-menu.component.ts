import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Injector, Input, OnInit, Output } from '@angular/core';
import { DirectiveModule } from 'src/app/directives/directive.module';
import { GeneralFormMenu } from 'src/app/enum/general-form-menu';
import { Access } from 'src/app/models/Access';
import { GeneralMenu, TypeViewMenu, ViewButtons } from 'src/app/models/Menu';


@Component({
  standalone: true,
  selector: 'app-menu-general',
  templateUrl: './general-form-menu.component.html',
  styleUrls: ['./general-form-menu.component.scss'],
  imports: [
    CommonModule,
    DirectiveModule
  ]
})
export class GeneralFormMenuComponent extends GeneralMenu {

  /**
   * Establece el valor de la propiedad access.
   *
   * @param value - El valor de acceso que se asignará
   */
  @Input('access') set accessInput(value: Access) { this.access = value; }

  /**
   * Establece el valor de la propiedad view_buttons.
   *
   * @param value - El valor de los botones de vista que se asignará
   */
  @Input('view_buttons') set viewButtonsInput(value: ViewButtons) { this.viewButtons = value; }

  //EMITIR DE LOS BOTONES
  @Output() guardar: EventEmitter<GeneralFormMenu.create> = new EventEmitter<GeneralFormMenu.create>();
  @Output() goToCreate: EventEmitter<GeneralFormMenu.create> = new EventEmitter<GeneralFormMenu.create>();
  // @Output() editar: EventEmitter<GeneralFormMenu.edit> = new EventEmitter<GeneralFormMenu.edit>();
  @Output() delete: EventEmitter<GeneralFormMenu.delete> = new EventEmitter<GeneralFormMenu.delete>();
  @Output() archivar: EventEmitter<GeneralFormMenu.file> = new EventEmitter<GeneralFormMenu.file>();
  @Output() search: EventEmitter<GeneralFormMenu.search> = new EventEmitter<GeneralFormMenu.search>();
  @Output() descartar: EventEmitter<GeneralFormMenu.descartar> = new EventEmitter<GeneralFormMenu.descartar>();

  constructor() {
    super(undefined, undefined);
  }

  callGoToCreate() {
    this.viewButtons = this.createOrEditMode()
    this.goToCreate.emit()
  }
}
