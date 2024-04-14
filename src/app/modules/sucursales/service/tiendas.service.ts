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
export class ShopService {

  /**
   *Columnas de almacenes crud
   *
   * @type {Columns[]}
   * @memberof ShopService
   */
  columns_shop: Columns[] = [
    { key: 'id', label: 'id' },
    { key: 'name_shop', label: 'Nombre' },
    { key: 'direction', label: 'Dirección' },
    { key: 'estatus', label: 'Estatus' },
  ]


  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  public createShop(body: Shop): Observable<Shop> {
    return this.http.post<Shop>(`${environments.host}api/shop/create`, body)
  }

  public listShop(): Observable<Shop[]> {
    return this.http.get<Shop[]>(`${environments.host}api/shop/list-shop`)
  }


  public deleteShop(id: number) {
    return this.http.delete<any>(`${environments.host}api/shop/delete/${id}`)
  }

  public closeShop(id: number) {
    return this.http.get<any>(`${environments.host}api/shop/archive/${id}`)
  }
}