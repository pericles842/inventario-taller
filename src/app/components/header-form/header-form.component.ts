import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-header-form',
  templateUrl: './header-form.component.html',
  styleUrls: ['./header-form.component.scss']
})
export class HeaderFormComponent {

  @Input() header: string = 'Header'
  @Input() description: string = 'Descripción'

}
