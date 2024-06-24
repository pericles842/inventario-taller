import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from 'environments/environment.local';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/modules/configuracion/models/UsuariosModel';
import { RolUser } from '../models/Status.Interface';
import { AuthService } from 'src/app/components/login/services/Auth.service';
import { Columns } from 'src/app/interfaces/ConfigsFormsData.interface';
import { Moneda } from '../models/Moneda.model';


@Injectable({
    providedIn: 'root'
})
export class MonedasService {

    protected userAuthenticated: Usuario = this.authService.getUser();


    columns_tasas: Columns[] = [
        { label: 'id', key: 'id' },
        { label: 'Fecha Creación', key: 'created_at' },
        { label: 'Ultima actualización', key: 'updated_at' },
        { label: 'Tasa', key: 'price' }
    ];

    columns_monedas: Columns[] = [
        { label: 'id', key: 'id' },
        { label: 'Nombre', key: 'name' },
        { label: 'iso', key: 'iso' },
        { label: 'Por defecto', key: 'default' }
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
}