import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Tasa } from 'src/app/modules/configuracion/models/Moneda.model';
import { InputFormsComponent } from "../input-forms/input-forms.component";

@Component({
  selector: 'app-tasas',
  standalone: true,
  templateUrl: './tasas.component.html',
  styleUrls: ['./tasas.component.scss'],
  imports: [InputFormsComponent, FormsModule, CommonModule]
})
export class TasasComponent {
  /**
   *Objeto tasas
   *
   * @type {Tasa}
   * @memberof TasasComponent
   */
  @Input() tasa: Tasa = new Tasa()

  constructor() { }
}
