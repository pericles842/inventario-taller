import { Routes } from '@angular/router';
import { AlmacenCrudComponent } from './pages/almacenes/almacen-crud/almacen-crud.component';
import { TiendaCrudComponent } from './pages/tiendas/tienda-crud/tienda-crud.component';



export const StoreRoutes: Routes = [
  {
    path: 'almacenes',
    children: [
      {
        path: 'create-store',
        component: AlmacenCrudComponent
      },
    ]
  },
  {
    path: 'tiendas',
    children: [
      {
        path: 'create-shop',
        component: TiendaCrudComponent
      },
    ]
  }
];
