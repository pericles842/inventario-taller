import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from 'environments/environment.local';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/modules/usuarios/models/UsuariosModel';
import { RolUser } from '../models/Status.Interface';
import { AuthService } from 'src/app/components/login/services/Auth.service';
import { Columns } from 'src/app/interfaces/ConfigsFormsData.interface';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  protected userAuthenticated: Usuario = this.authService.getUser();

  columns:Columns[] = [
    {label:'id',key:'id'},
    {label:'Nombre',key:'name_user'},
    {label:'Email',key:'email'},
    {label:'Cargo',key:'name_rol'}
  ]

  constructor(
    private http: HttpClient,
    private authService: AuthService
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

    const headers = new HttpHeaders().set('rol', this.userAuthenticated.rol.toString());

    return this.http.get<RolUser[]>(`${environments.host}api/status/list-roles`, { headers })
  }

  /**
   *Busqueda de  usuarios 
   *
   * @return {*} 
   * @memberof UsuariosService
   */
  searchUser() {

    const headers = new HttpHeaders().set('user', this.userAuthenticated.id.toString());
    return this.http.get<Usuario[]>(`${environments.host}api/user/list-users`, { headers })

  }
}