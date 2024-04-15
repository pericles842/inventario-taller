import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/components/login/services/Auth.service';
import { Columns } from 'src/app/interfaces/ConfigsFormsData.interface';
import { Shop } from '../models/Tienda.Model';
import { Observable } from 'rxjs';
import { environments } from 'environments/environment.local';

@Injectable({
  providedIn: 'root'
})
export class BranchesService {

  /**
   *Columnas de usuarios
   *
   * @type {Columns[]}
   * @memberof BranchesService
   */
  columns_users: Columns[] = [
    { label: 'id', key: 'id' },
    { label: 'Nombre', key: 'name_user' },
    { label: 'Email', key: 'email' },
    { label: 'Cargo', key: 'name_rol' }
  ]


  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }
/**
 *Lista los usuarios que no estan asignados a ninguna sucursal
 *
 * @return {*}  {Observable<any[]>}
 * @memberof BranchesService
 */
public listUsersBranch(): Observable<any[]> {
    return this.http.get<any[]>(`${environments.host}api/branch/list-uses`)
  }
   
}