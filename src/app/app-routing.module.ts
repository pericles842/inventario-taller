import { Routes } from '@angular/router';

import { authGuardGuard } from './auth-guard.guard';
import { LoginComponent } from './components/login/login.component';
import { FullComponent } from './layouts/full/full.component';

export const AppRoutes: Routes = [
  
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
        path: 'setting',
        loadChildren: () => import('./modules/configuracion/configuracion.module').then(m => m.ConfigurationModule)
      },
      {
        path: 'sucursales',
        loadChildren: () => import('./modules/sucursales/sucursales.module').then(m => m.AlmacenesModule)
      }
    ],
  }
];