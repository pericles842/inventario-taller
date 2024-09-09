import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from 'environments/environment.local';
import { Category, PriceList } from '../models/inventory.model';
import { Observable } from 'rxjs';
import { Columns, TreeNodeCategory } from 'src/app/interfaces/ConfigsFormsData.interface';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  columns_price_list: Columns[] = [
    { label: 'ID', key: 'id', visible: true },
    { label: 'Nombre', key: 'name', visible: true },
    { label: 'Fecha de creación', key: 'fecha_inicio', visible: true, type: 'fecha' },
    { label: 'Fecha de finalización', key: 'fecha_fin', visible: true, type: 'fecha' },
  ]

  /**
   *Columnas de l atabla detalle de lisa de precios 
   *
   * @type {Columns[]}
   * @memberof InventarioService
   */
  columns_price_list_detail: Columns[] = [
    { label: 'Product_id', key: 'product_id', visible: true },
    { label: 'Producto', key: 'product_name', visible: true },
    { label: 'Categoría', key: 'categoria', visible: true },
    { label: 'Precio', key: 'price', visible: true },
    { label: 'Precio neto ', key: 'net_price', visible: true },
    { label: 'Descuento', key: 'discount', visible: true },
    { label: 'iva', key: 'iva', visible: true },
    { label: 'active_discount', key: 'active_discount', visible: true, type: 'boolean' },

  ]

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Lista las categorias del sistema
   *
   * @return {Category} 
   */
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environments.host}api/category`)
  }
  /**
   * Crea una nueva categoria
   *
   * @param {Category} category
   * @return {*}  {Observable<Category>}
   * @memberof InventarioService
   */
  createCategory(category: Category): Observable<Category> {
    let body: { category: Category } = { category: category }
    return this.http.post<Category>(`${environments.host}api/category`, body)
  }
  /**
   *obtiene un arbol de categorías padre e hijos
   *
   * @return {*}  {Observable<TreeNodeCategory[]>}
   * @memberof InventarioService
   */
  getCategoryTree(): Observable<TreeNodeCategory[]> {
    return this.http.get<TreeNodeCategory[]>(`${environments.host}api/category/tree`)
  }
  /**
   *Elimina una categoría, si esta tiene hijos se eliminara por completo
   *
   * @param {number} id
   * @return {*}  {Observable<number>}
   * @memberof InventarioService
   */
  deleteCategory(id: number): Observable<number> {
    return this.http.delete<number>(`${environments.host}api/category/${id}`)
  }

  /**
   * Crea una lista de precios
   *
   * @param {PriceList} priceList - Objeto lista de precios
   * @return {Observable<PriceList>} The created price list.
   */
  createPriceList(priceList: PriceList): Observable<PriceList> {
    let body: { priceList: PriceList } = { priceList: priceList }
    return this.http.post<PriceList>(`${environments.host}api/price-list`, body)
  }

  /**
   *Obtiene una lista de precis
   *
   * @return {*}  {Observable<PriceList>}
   * @memberof InventarioService
   */
  getPriceList(): Observable<PriceList[]> {
    return this.http.get<PriceList[]>(`${environments.host}api/price-list`)
  }
}
