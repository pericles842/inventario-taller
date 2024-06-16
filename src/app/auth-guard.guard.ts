import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './components/login/services/Auth.service';

export const authGuardGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);
  let authenticated: boolean = JSON.parse(sessionStorage.getItem('authenticated') as string)

  if (authService.isLoggedIn() || authenticated) {
  //  if (user?.token != undefined) {
  //    //setea el usuario
  //    authService.setUser(user)
  //    //se autentifica
  //    authService.setAuthenticated()
  //  }

    return true;
  }

  return router.parseUrl('login');
};
