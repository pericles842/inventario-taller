import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from 'environments/environment.local';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/modules/usuarios/models/UsuariosModel';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated: boolean = false;
  constructor(
    private http: HttpClient
  ) { }

  /**
   *Autentica un usuario
   *
   * @param {Usuario} user
   * @return {Usuario} 
   * @memberof ServiceService
   */
  public login(user: Usuario): Observable<Usuario[]> {
    let body = {
      username: user.username,
      password: user.password
    }
    return this.http.post<Usuario[]>(`${environments.host}api/user/authentication`, body)
  }
  /**
   *Setae la autenticación
   *
   * @memberof AuthService
   */
  public setAuthenticated() {
    this.isAuthenticated = true;
  }

  /**
   *Salir de la session
   *
   * @memberof AuthService
   */
  logout(): void {
    this.isAuthenticated = false;
  }

  /**
   *verofica si esta logeado
   *
   * @return {*}  {boolean}
   * @memberof AuthService
   */
  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  
}
