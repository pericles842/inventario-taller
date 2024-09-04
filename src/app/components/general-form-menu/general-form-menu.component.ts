import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
export class GeneralFormMenuComponent {


  /**
   *Acceso de los botones
   *
   * @type {Access}
   * @memberof GeneralFormMenuComponent
   */
  @Input() access: Access = new Access()

  /**
   *Modos del menu
   *
   * @type {ViewButtons}
   * @memberof GeneralFormMenuComponent
   */
  @Input() view_buttons: ViewButtons = {
    create_label: 'Guardar',
    create: false,
    search: false,
    descartar: false,
    delete: false,
    archivar: false
  }


  //EMITIR DE LOS BOTONES
  @Output() guardar: EventEmitter<GeneralFormMenu.create> = new EventEmitter<GeneralFormMenu.create>();
  // @Output() editar: EventEmitter<GeneralFormMenu.edit> = new EventEmitter<GeneralFormMenu.edit>();
  @Output() delete: EventEmitter<GeneralFormMenu.delete> = new EventEmitter<GeneralFormMenu.delete>();
  @Output() archivar: EventEmitter<GeneralFormMenu.file> = new EventEmitter<GeneralFormMenu.file>();
  @Output() search: EventEmitter<GeneralFormMenu.search> = new EventEmitter<GeneralFormMenu.search>();
  @Output() descartar: EventEmitter<GeneralFormMenu.descartar> = new EventEmitter<GeneralFormMenu.descartar>();


  // /**
  //  *Cambios del input
  //  *
  //  * @param {*} changes
  //  * @memberof GeneralFormMenuComponent
  //  */
  // ngOnChanges(changes: any) {
  //   if ('type_view' in changes) {
  //     const cambio = changes.type_view;


  //     //? Valor anterior cambio.previousValue 
  //     //?  Valor actual cambio.currentValue 

  //     switch (this.type_view) {
  //       case 0:
  //         this.presentation()
  //         break;

  //       case 1:
  //         this.viewForm()
  //         break;
  //     }
  //   }
  // }


}
