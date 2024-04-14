import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from 'environments/environment.local';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/components/login/services/Auth.service';
import { Columns } from 'src/app/interfaces/ConfigsFormsData.interface';
import { Store } from '../models/AlmacenModel';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  /**
   *Columnas de almacenes crud
   *
   * @type {Columns[]}
   * @memberof StoreService
   */
  columns_store: Columns[] = [
    { key: 'id', label: 'id' },
    { key: 'name_store', label: 'Nombre' },
    { key: 'direction', label: 'Dirección' },
    { key: 'estatus', label: 'Estatus' },
  ]


  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  /**
   *Crea un almacen
   *
   * @param {Store} body
   * @return {*}  {Observable<Store>}
   * @memberof StoreService
   */
  public createStore(body: Store): Observable<Store> {
    return this.http.post<Store>(`${environments.host}api/store/create`, body)
  }
  /**
   * Listar almacenes
   *
   * @return {*}  {Observable<Store[]>}
   * @memberof StoreService
   */
  public listStore(): Observable<Store[]> {
    return this.http.get<Store[]>(`${environments.host}api/store/list-store`)
  }

  /**
   *Elimina un almacen
   *
   * @param {number} id
   * @return {*} number
   * @memberof StoreService
   */
  public deleteStore(id: number) {
    return this.http.delete<any>(`${environments.host}api/store/delete/${id}`)
  }
  /**
   * cerrar un almacene
   *
   * @param {number} id
   * @return {*} number
   * @memberof StoreService
   */
  public closeStore(id: number) {
    return this.http.get<any>(`${environments.host}api/store/archive/${id}`)
  }
}
