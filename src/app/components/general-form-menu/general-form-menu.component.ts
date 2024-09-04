import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DirectiveModule } from 'src/app/directives/directive.module';
import { GeneralFormMenu } from 'src/app/enum/general-form-menu';
import { Access } from 'src/app/models/Access';
import { ViewButtons } from 'src/app/models/Menu';


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
export class GeneralFormMenuComponent {

  /**
   * Establece el valor de la propiedad access.
   *
   * @param value - El valor de acceso que se asignará
   */
  @Input() access: Access = new Access();

  /**
   * Establece el valor de la propiedad view_buttons.
   *
   *  
   */
  @Input() view_buttons: ViewButtons = {
    create_label: 'Crear',
    go_to_create: false,
    create: false,
    descartar: false,
    search: false,
    delete: false,
    archivar: false
  };


  //EMITIR DE LOS BOTONES
  @Output() guardar: EventEmitter<GeneralFormMenu.create> = new EventEmitter<GeneralFormMenu.create>();
  @Output() goToCreate: EventEmitter<GeneralFormMenu.create> = new EventEmitter<GeneralFormMenu.create>();
  // @Output() editar: EventEmitter<GeneralFormMenu.edit> = new EventEmitter<GeneralFormMenu.edit>();
  @Output() delete: EventEmitter<GeneralFormMenu.delete> = new EventEmitter<GeneralFormMenu.delete>();
  @Output() archivar: EventEmitter<GeneralFormMenu.file> = new EventEmitter<GeneralFormMenu.file>();
  @Output() search: EventEmitter<GeneralFormMenu.search> = new EventEmitter<GeneralFormMenu.search>();
  @Output() descartar: EventEmitter<GeneralFormMenu.descartar> = new EventEmitter<GeneralFormMenu.descartar>();

}
