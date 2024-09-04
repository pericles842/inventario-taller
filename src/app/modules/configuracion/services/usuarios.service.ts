import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from 'environments/environment.local';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/modules/configuracion/models/UsuariosModel';
import { RolUser } from '../models/Status.Interface';
import { AuthService } from 'src/app/components/login/services/Auth.service';
import { Columns } from 'src/app/interfaces/ConfigsFormsData.interface';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  columns: Columns[] = [
    { label: 'id', key: 'id' },
    { label: 'Nombre', key: 'name_user' },
    { label: 'Email', key: 'email' },
    { label: 'Cargo', key: 'name_rol' },
    { label: 'Archivado', key: 'archivado' }
  ]

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
  listRoles(): Observable<RolUser[]> {

    return this.http.get<RolUser[]>(`${environments.host}api/status/list-roles`)
  }

  /**
   *Busqueda de  usuarios 
   *
   * @return {*} 
   * @memberof UsuariosService
   */
  searchUser() {
    return this.http.get<Usuario[]>(`${environments.host}api/user/list-users`)

  }

  /**
   *Elimina un usuario
   *
   * @param {number} id
   * @return {*} 
   * @memberof UsuariosService
   */
  deleteUser(id: number) {
    return this.http.delete<any>(`${environments.host}api/user/delete/${id}`)
  }
  /**
   *archiva un usuario
   *
   * @param {number} id
   * @return {*} 
   * @memberof UsuariosService
   */
  archiveUser(id: number) {
    return this.http.get<any>(`${environments.host}api/user/archive/${id}`)
  }

}