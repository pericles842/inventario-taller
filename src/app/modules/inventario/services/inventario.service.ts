import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from 'environments/environment.local';
import { Category } from '../models/inventory.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

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
}
