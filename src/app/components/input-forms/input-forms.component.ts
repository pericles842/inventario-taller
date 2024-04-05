import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-input-forms',
  templateUrl: './input-forms.component.html',
  styleUrls: ['./input-forms.component.scss'],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFormsComponent),
      multi: true
    }
  ]
})
export class InputFormsComponent {
  /**
   *Label de  input
   *
   * @type {string}
   * @memberof InputFormsComponent
   */
  @Input() labelInput: string = 'Label'
  /**
   *Tipo de input
   *
   * @type {('text' | 'email' | 'password' | 'number' | 'search' | 'date' | 'select')}
   * @memberof InputFormsComponent
   */
  @Input() typeInput: 'text' | 'email' | 'password' | 'number' | 'search' | 'date' | 'select' | 'checkbox' = 'text'

  /**
   *En caso de ser un select definir los recursos
   *
   * @type {{key:string,label:string}[]}
   * @memberof InputFormsComponent
   */
  @Input() resources: { id: number, name: string }[] = []
  /**
   *define si los campos se pueden editar o no
   *
   * @type {boolean}
   * @memberof InputFormsComponent
   */
  @Input() disabled: boolean = false

  @Input() placeholder: string = ' ';
  /**
   *Almacena el valor del input
   *
   * @type {*}
   * @memberof InputFormsComponent
   */
  value: any = '';

  /**
   *Es utilizada para notificar a Angular cuando el valor del componente ha cambiado
   *
   * @type {*}
   * @memberof InputFormsComponent
   */
  onChange: any = () => { };
  /**
   * será llamada cuando el usuario interactúe con el componente (por ejemplo, al hacer clic fuera del <input>).
   *
   * @type {*}
   * @memberof InputFormsComponent
   */
  onTouched: any = () => { };

  constructor() { }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInputChange(event: any): void {
    this.value = event.target.value;
    this.onChange(this.value);
    this.onTouched();
  }

  /**
   *Detecta el cambio del check
   *
   * @param {*} event
   * @memberof InputFormsComponent
   */
  onCheckboxChange(event: any) {
    this.value = !this.value
    this.onChange(this.value);
    this.onTouched();

  }
}
