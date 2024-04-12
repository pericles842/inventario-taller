import { Routes } from '@angular/router';
import { AlmacenCrudComponent } from './pages/almacen-crud/almacen-crud.component';



export const StoreRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'create-store',
        component: AlmacenCrudComponent
      },
    ]
  }
];
