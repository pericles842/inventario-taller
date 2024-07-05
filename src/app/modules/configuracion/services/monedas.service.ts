import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from 'environments/environment.local';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/modules/configuracion/models/UsuariosModel';
import { RolUser } from '../models/Status.Interface';
import { AuthService } from 'src/app/components/login/services/Auth.service';
import { Columns } from 'src/app/interfaces/ConfigsFormsData.interface';
import { HttpTasaCreate, Moneda, RequestCreateCurrency, RequestUpdateTasa, ResponseCreateCurrency } from '../models/Moneda.model';


@Injectable({
    providedIn: 'root'
})
export class MonedasService {

    protected userAuthenticated: Usuario = this.authService.getUser();


    columns_tasas: Columns[] = [
        { label: 'id', key: 'id' },
        { label: 'Fecha Creación', key: 'created_at', type: 'fecha' },
        { label: 'Ultima actualización', key: 'updated_at', type: 'fecha' },
        { label: 'Tasa', key: 'price' }
    ];

    columns_monedas: Columns[] = [
        { label: 'id', key: 'id' },
        { label: 'Nombre', key: 'name' },
        { label: 'iso', key: 'iso' },
        { label: 'Por defecto', key: 'default', type: 'boolean' }
    ];

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) { }

    /**
     *Obtiene una condiguracion de monedas con sus tasas
     *
     * @return {*} 
     * @memberof MonedasService
     */
    getConfiguredCoins() {
        return this.http.get<Moneda[]>(`${environments.host}api/coin`)
    }
    /**
     *acuatizar una tasa
     *
     * @param {number} id
     * @param {number} price
     * @return {*}  {Observable<{ price: number, id: number }>}
     * @memberof MonedasService
     */
    updateCurrencyPrice(id: number, price: number): Observable<{ price: number, id: number }> {
        let body: RequestUpdateTasa = { config: { id, price } };
        return this.http.put<{ price: number, id: number }>(`${environments.host}api/coin/price`, body)
    }
    /**
    *actualizar tasas
    *
    * @param {number} id_coin idd de la moneda
    * @param {number} price
    * @return {*}  {Observable<HttpTasaCreate['response']>}
    * @memberof MonedasService
    */
    createCurrencyPrice(id_coin: number, price: number): Observable<HttpTasaCreate['response']> {

        let body: HttpTasaCreate['request'] = { config: { id_coin, price } };
        return this.http.post<HttpTasaCreate['response']>(`${environments.host}api/coin/price`, body)
    }

    /**
     *creara o actualizar nueva tasa
     *
     * @param {string} iso
     * @param {string} name
     * @param {boolean} por_defecto
     * @param {number} [id]
     * @return {*} 
     * @memberof MonedasService
     */
    saveNewCurrency(iso: string, name: string, por_defecto: boolean, id?: number): Observable<ResponseCreateCurrency> {
        let body: RequestCreateCurrency = { moneda: { iso, name, default: por_defecto, id } }
        return this.http.post<ResponseCreateCurrency>(`${environments.host}api/coin`, body)
    }

    /**
     *Elimina una tasas
     *
     * @param {number} id
     * @return {*} 
     * @memberof MonedasService
     */
    deleteCurrency(id: number) {
        return this.http.delete<number>(`${environments.host}api/coin/price/${id}`)
    }
}