import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from 'environments/environment.local';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/components/login/services/Auth.service';
import { Columns } from 'src/app/interfaces/ConfigsFormsData.interface';
import { Sucursal, typeBranch } from '../models/Sucursal.Model';

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
  columns_branch_not_users: Columns[] = [
    { label: 'id', key: 'user_id' },
    { label: 'Nombre', key: 'name_user' },
    { label: 'Email', key: 'email' },
    { label: 'Cargo', key: 'cargo' }
  ]
  /**
   *Tala de usuarios asignados a una sucursal
   *
   * @type {Columns[]}
   * @memberof BranchesService
   */
  columns_branch_users: Columns[] = [
    { label: 'id', key: 'user_id' },
    { label: 'Nombre', key: 'name_user' },
    { label: 'Email', key: 'email' },
    { label: 'Cargo', key: 'cargo' }
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
  public listUsersNotBranch(): Observable<Sucursal[]> {
    return this.http.get<Sucursal[]>(`${environments.host}api/branch/users-not-branch`)
  }

  /**
   *Lista todas las sucursales
   *
   * @return {*}  {Observable<any[]>}
   * @memberof BranchesService
   */
  public listAllBranch(): Observable<{ type: 'almacen' | 'tienda', id: number, name: string }[]> {
    return this.http.get<{ type: 'almacen' | 'tienda', id: number, name: string }[]>(`${environments.host}api/branch/all-branch`)
  }

  /**
   *Lista los usuarios asignados a una sucursal
   *
   * @param {typeBranch["typeBranch"]} type_branch
   * @param {number} id_branch
   * @return {*}  {Observable<Sucursal[]>}
   * @memberof BranchesService
   */
  public listBranchUsers(type_branch: typeBranch["typeBranch"], id_branch: number): Observable<Sucursal[]> {

    let body = {
      type_branch: type_branch,
      id_branch: id_branch
    }
    return this.http.post<Sucursal[]>(`${environments.host}api/branch/users`, body)
  }
}