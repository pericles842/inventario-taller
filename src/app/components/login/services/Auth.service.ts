import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environments } from 'environments/environment.local';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/modules/usuarios/models/UsuariosModel';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated: boolean = false;

  public usuario: Usuario = new Usuario()

  constructor(
    private http: HttpClient,
    private router: Router
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
    sessionStorage.setItem('authenticated', JSON.stringify(this.isAuthenticated))
  }

  /**
   *Sete el usuario
   *
   * @param {Usuario} user
   * @memberof AuthService
   */
  public setUser(user: Usuario) {
    this.usuario = user
    this.createCookie('user_info', JSON.stringify(this.usuario), 4)

  }

  /**
   *Otiene el usuario
   *
   * @return {*} 
   * @memberof AuthService
   */
  getUser() {
    return this.getCookie('user_info') as Usuario
  }
  /**
   *Salir de la session
   *
   * @memberof AuthService
   */
  logout(): void {
    this.isAuthenticated = false;
    sessionStorage.setItem('authenticated', JSON.stringify(this.isAuthenticated))
    this.deleteCookie('user_info')
    this.router.navigateByUrl('/login')
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

  /**
   *Crea un Cookie
   *
   * @param {string} key llave
   * @param {string} value valor 
   * @param {number} hours tiempo de expiracion
   * @memberof AuthService
   */
  createCookie(key: string, value: string, hours: number) {
    const expirationDate = new Date();

    // Calcula la fecha de expiración sumando las horas
    expirationDate.setTime(expirationDate.getTime() + (hours * 60 * 60 * 1000));

    // Formatea la fecha de expiración
    const expires = "; expires=" + expirationDate.toUTCString();

    document.cookie = encodeURIComponent(key) + '=' + encodeURIComponent(value) + expires + '; path=/';
  }

  /**
   *lee una cookie
   *
   * @param {string} name llave
   * @return {*}  {(string | null)}
   * @memberof AuthService
   */
  getCookie(name: string): Object | null {
    const decodedKey = decodeURIComponent(name);
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());

    for (const cookie of cookies) {
      const [cookieKey, cookieValue] = cookie.split('=').map(cookiePart => cookiePart.trim());
      if (cookieKey === decodedKey) {
        return JSON.parse(decodeURIComponent(cookieValue));
      }
    }

    return null;
  }

  /**
   *Elimina una cokie
   *
   * @param {string} key
   * @memberof AuthService
   */
  deleteCookie(key: string) {
    document.cookie = encodeURIComponent(key) + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }
}
