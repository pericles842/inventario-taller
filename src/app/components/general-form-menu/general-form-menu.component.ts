import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { DirectiveModule } from 'src/app/directives/directive.module';
import { GeneralFormMenu } from 'src/app/enum/general-form-menu';
import { ExtraButtons } from 'src/app/interfaces/ConfigsFormsData.interface';
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
     *Botones adicionales del formulario
     *
     * @type {ExtraButtons[]}
     * @memberof GeneralFormMenuComponent
     */
  @Input() extraButtons: ExtraButtons[] = [];

  /**
   * Establece el valor de la propiedad access.
   *
   * @param value - El valor de acceso que se asignará
   */
  @Input() access: Access = new Access();

  /**
   * Emitir de los botones
   * 
   * @memberof GeneralFormMenuComponent
   */
  @Output() extraButtonEvent: EventEmitter<ExtraButtons> = new EventEmitter<ExtraButtons>();

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

  ngOnChanges(changes: SimpleChanges) {

    //? SI SE ACTUALIZA ES DECIR SE OBTIENE EL PARÁMETRO SE LLAMA EL MÉTODO PARA SIGNAR EL ACCESO A LOS BOTONES PERSONALIZADOS
    if (changes['access']) this.setAccessExtraButtons(this.extraButtons);
  }

  /**
   * Establece los permisos de los botones extra.
   *
   * @param {ExtraButtons[]} extraButtons botones extra
   * @memberof GeneralFormMenuComponent
   */
  setAccessExtraButtons(extraButtons: ExtraButtons[]) {
    extraButtons.map(button => { button.access = this.access });
    this.extraButtons = extraButtons;
  }

}
