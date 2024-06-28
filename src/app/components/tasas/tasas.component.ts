import { Component, Input } from '@angular/core';
import { Tasa } from 'src/app/modules/configuracion/models/Moneda.model';
import { InputFormsComponent } from "../input-forms/input-forms.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tasas',
  standalone: true,
  templateUrl: './tasas.component.html',
  styleUrls: ['./tasas.component.scss'],
  imports: [InputFormsComponent, FormsModule]
})
export class TasasComponent {
  /**
   *Objeto tasas
   *
   * @type {Tasa}
   * @memberof TasasComponent
   */
  @Input() tasa: Tasa = new Tasa()

  /**
   *retorna el objeto
   *
   * @return {*}  {Tasa}
   * @memberof TasasComponent
   */
  returnObjectComponent(): Tasa {
    return this.tasa
  }
}
