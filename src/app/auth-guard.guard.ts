import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './components/login/services/service.service';
import { Usuario } from './modules/usuarios/models/UsuariosModel';

export const authGuardGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  //!Fallo de seguridad no usar lsession storage / crear un servicio
  let user: Usuario = JSON.parse(sessionStorage.getItem('user') as string)

  if (authService.isLoggedIn() || user?.token != undefined) {
   if (user?.token != undefined) {
     //setea el usuario
     authService.setUser(user)
     //se autentifica
     authService.setAuthenticated()
   }

    return true;
  }

  return router.parseUrl('login');
};
