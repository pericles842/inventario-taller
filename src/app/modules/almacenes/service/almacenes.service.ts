import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environments } from 'environments/environment.local';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/modules/usuarios/models/UsuariosModel';
import { AuthService } from 'src/app/components/login/services/Auth.service';
import { Columns } from 'src/app/interfaces/ConfigsFormsData.interface';
import { Store } from '../models/AlmacenModel';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

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
}
