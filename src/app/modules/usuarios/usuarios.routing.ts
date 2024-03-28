import { Routes } from '@angular/router';
import { UsuariosFormComponent } from './components/usuarios-form/usuarios-form.component';


export const UsuariosRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'create/users',
        component: UsuariosFormComponent
      },
    ]
  }
];
