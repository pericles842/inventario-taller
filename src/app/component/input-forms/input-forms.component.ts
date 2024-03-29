import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-input-forms',
  templateUrl: './input-forms.component.html',
  styleUrls: ['./input-forms.component.scss'],
  imports: [
    CommonModule,
    FormsModule
  ],
})
export class InputFormsComponent {
  @Input() labelInput: string = 'Label'
  @Input() typeInput: 'text' | 'email' | 'password' | 'number' | 'search' | 'date' | 'select' = 'text'
  @Input() resources: {key:string,label:string}[] = []
  @Input() disabled: boolean = true
}
