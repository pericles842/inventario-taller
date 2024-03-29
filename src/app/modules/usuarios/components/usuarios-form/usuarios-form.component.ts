import { Component } from '@angular/core';

@Component({
  selector: 'app-usuarios-form',
  templateUrl: './usuarios-form.component.html',
  styleUrls: ['./usuarios-form.component.scss']
})
export class UsuariosFormComponent {
  rolesUser: any[] = [
    {
      label: 'Administrador',
      key: 2
    },
    {
      label: 'Jefe de almacén',
      key: 3
    },
    {
      label: 'Gerente de tienda',
      key: 4
    },
    {
      label: 'Empleado',
      key: 5
    }
  ]
}
