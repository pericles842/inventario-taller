import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from 'environments/environment.local';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/modules/usuarios/models/UsuariosModel';
import { RolUser } from '../models/Status.Interface';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Crea un usuario en el sistema 
   * 
   * @param {Usuario} body
   * @return {*}  {Observable<Usuario>}
   * @memberof UsuariosService
   */
  createUser(body: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${environments.host}api/user/create`, body)
  }

  /**
   *Lista los estatus
   *
   * @param {number} rol
   * @return {*} Status
   * @memberof UsuariosService
   */
  listStatus(rol: number): Observable<RolUser[]> {
    
    let body = { rol: rol }
    return this.http.post<RolUser[]>(`${environments.host}api/status/listStatus`, body)
  }
}