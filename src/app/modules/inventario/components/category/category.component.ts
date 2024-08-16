import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/components/login/services/Auth.service';
import { Modules } from 'src/app/enum/Modules';
import { Access } from 'src/app/models/Access';
import { GeneralMenu } from 'src/app/models/Menu';
import { ToastService } from 'src/app/services/toast/toast.service';
import { InventarioService } from '../../services/inventario.service';
import { Category } from '../../models/inventory.model';
import { Columns } from 'src/app/interfaces/ConfigsFormsData.interface';
import { DynamicTableComponent } from 'src/app/components/dynamic-table/dynamic-table.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent extends GeneralMenu implements OnInit {

  category: Category = new Category();
  list_categories: Category[] = [];
  list_categories_dropdown: Category[] = [];

  constructor(
    private toastService: ToastService,
    private inventarioService: InventarioService,
    authService: AuthService
  ) { super(authService, Modules.inventario) }

  ngOnInit(): void {
    this.getCategories();
  }

  /**
   *Obtiene las categorias de inventario service
   *
   * @return {void} No return value, updates the list_categories property.
   */
  getCategories(): void {
    this.inventarioService.getCategories().subscribe(res => {
      this.category.father_category_id = res[0].id
      this.list_categories_dropdown = res;
    })
  }
  saveCategory(): void {
    this.category.father_category_id = this.category.father_category_id !== null ? parseInt(this.category.father_category_id.toString()) : null;
    this.inventarioService.createCategory(this.category).subscribe({
      next: (res) => {

        this.toastService.success('Categoría creada')
      },
      error: (err) => {
        this.toastService.error('Error en categoría')
      },
    })
  }
  /**
   *coloca el father_category_id en null de la categoria
   *
   * @memberof CategoryComponent
   */
  eliminateFatherCategory(): void {
    this.category.father_category_id = null

  }
  /**
   *Restablece el father_category_id y selecciona la primera categoría
   *
   * @memberof CategoryComponent
   */
  resetSelectableCategory(): void {
    if (this.category.father_category_id == null) {
      this.category.father_category_id = this.list_categories_dropdown[0].id
    }
  }
  /**
   *Selecciona la categoría de la tabla
   *
   * @param {*} event
   * @memberof CategoryComponent
   */
  selectCategory(event: any): void {
    this.category = event
  }
  /**
   *Despliega el modal y consume el servicio de la lista de categorías
   *
   * @memberof CategoryComponent
   */
  openModalCategory(): void {
    this.getCategories()
  }
}
