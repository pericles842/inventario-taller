import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environments } from 'environments/environment.local';
import { Observable, catchError, from, map } from 'rxjs';
import { Access } from 'src/app/models/Access';
import { AuthUser, Usuario } from 'src/app/modules/configuracion/models/UsuariosModel';
import { ToastService } from 'src/app/services/toast/toast.service';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated: boolean = false;

  public usuario: Usuario = new Usuario();

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastService: ToastService
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
   *Obtiene la permisologia del usuario por modulo
   *
   * @param {number} module_id
   * @return {*}  {Observable<Access>}
   * @memberof AuthService
   */
  public accessModule(module_id: number): Observable<Access> {
    return from(this.accessUser()).pipe(
      map(modules => modules.find(module => module.id === module_id)),
      catchError(err => {
        throw err;
      })
    );
  }

  // public async accessModule(module_id: number): Promise<Access> {    
  //   try {
  //     const modules = await firstValueFrom(this.accessUser());
  //     return modules.find(module => module.id == module_id) ;
  //   } catch (err) {
  //     this.toastService.error('Error en permisos');
  //     throw err;
  //   }
  // }
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
   *Obtine los permisos del usuario
   *
   * @private
   * @memberof AuthService
   */
  public accessUser() {

    let user: Usuario = this.getUser();
    const headers = new HttpHeaders().set('user_id', user?.id.toString());

    return this.http.get<any[]>(`${environments.host}api/access/user`, { headers })
  }

  /**
   *Otiene el usuario
   *
   * @return {*} 
   * @memberof AuthService
   */
  getUser() {
    return this.getCookie('user_info') as AuthUser
  }

  /**
   *Salir de la session
   *
   * @memberof AuthService
   */
  logout(): void {
    this.isAuthenticated = false;
    sessionStorage.setItem('authenticated', JSON.stringify(this.isAuthenticated));

    this.deleteCookie('user_info')
    window.location.href = window.location.href;
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
