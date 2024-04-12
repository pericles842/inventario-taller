import { Routes } from '@angular/router';

import { authGuardGuard } from './auth-guard.guard';
import { LoginComponent } from './components/login/login.component';
import { FullComponent } from './layouts/full/full.component';

export const Approutes: Routes = [
  
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: FullComponent,
    canActivate: [authGuardGuard], 
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'about',
        loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
      },
      {
        path: 'component',
        loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule)
      },
      {
        path: 'usuarios',
        loadChildren: () => import('./modules/usuarios/usuarios.module').then(m => m.UsuariosModule)
      },
      {
        path: 'almacenes',
        loadChildren: () => import('./modules/almacenes/almacenes.module').then(m => m.AlmacenesModule)
      }
    ],
  }
];