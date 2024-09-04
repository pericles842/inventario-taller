import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../components/login/services/Auth.service';
import { Usuario } from '../modules/configuracion/models/UsuariosModel';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let user: Usuario = this.authService.getUser();

    let cloneRequest = request
    if (user) {
      //!MANDAR USER Y QUE EL SERVIDOR SE ENCARGUE DE VALIDAR
      cloneRequest = request.clone({
        setHeaders: {
          "user_id": user.id.toString(),
          "rol": user.rol.toString()
        }
      });
    }

    return next.handle(cloneRequest);
  }
}
