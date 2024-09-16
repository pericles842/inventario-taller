import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputFormsComponent } from "../../../../components/input-forms/input-forms.component";
import { DetailAttributes } from '../../models/Product.model';
import { SelectInput, TypeInput } from 'src/app/interfaces/ConfigsFormsData.interface';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, InputFormsComponent],
  selector: 'app-properties-products-form',
  templateUrl: './properties-products-form.component.html',
  styleUrls: ['./properties-products-form.component.scss']
})
export class PropertiesProductsFormComponent {

  @Input() proprieties: DetailAttributes = new DetailAttributes()
  /**
   *Tipos de campo
   *
   * @type {SelectInput}
   * @memberof PropertiesProductsFormComponent
   */
  dataTypesInput: SelectInput = [
    { id: 'text', name: 'Texto' },
    { id: 'number', name: 'Numero' },
    { id: 'select', name: 'Lista' },
    { id: 'checkbox', name: 'Checkbox' },
    { id: 'date', name: 'Fecha' },
    { id: 'color', name: 'Color' }
  ]

  /**
   *Valida de la propiedad que sea un select
   *
   * @readonly
   * @memberof PropertiesProductsFormComponent
   */
  get DataProprieties() {
    if (this.proprieties.data == null || typeof this.proprieties.data == 'boolean') return []
    return this.proprieties.data as SelectInput
  }

  /**
   *Agregar un renglon al formulario para colocar la data
   *
   * @memberof PropertiesProductsFormComponent
   */
  addData() {

    this.proprieties.data = this.proprieties.data ?? [];
    this.proprieties.data.push({ id: '', name: '' });
  }
  /**
   *Valida y limpia el formulario si es de tipo select
   *
   * @memberof PropertiesProductsFormComponent
   */
  validateTypeInput() {
    if (this.proprieties.type_input != 'select') this.proprieties.data = []
  }

  /**
   *Elimina un dato del formulario
   *
   * @param {number} index
   * @memberof PropertiesProductsFormComponent
   */
  deleteData(index: number) {
    this.proprieties.data!.splice(index, 1)
  }
}
