import { Routes } from '@angular/router';
import { UsuariosFormComponent } from './components/usuarios-form/usuarios-form.component';
import { MonedasCrudComponent } from './pages/monedas-crud/monedas-crud/monedas-crud.component';


export const ConfigRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'create-users',
        component: UsuariosFormComponent
      },
      {
        path: 'create-coins',
        component: MonedasCrudComponent
      },
    ]
  }
];
