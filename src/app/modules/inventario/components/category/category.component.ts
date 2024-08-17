import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/components/login/services/Auth.service';
import { Modules } from 'src/app/enum/Modules';
import { GeneralMenu } from 'src/app/models/Menu';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Category } from '../../models/inventory.model';
import { InventarioService } from '../../services/inventario.service';
import { DynamicModalComponent } from 'src/app/components/dynamic-modal/dynamic-modal.component';
import { ConfirmDialogService } from 'src/app/components/confirm-dialog/service/confirmDialog.service';
import { TreeNodeCategory } from 'src/app/interfaces/ConfigsFormsData.interface';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent extends GeneralMenu implements OnInit {

  @ViewChild('dynamic_modal') dynamic_modal!: DynamicModalComponent

  category: Category = new Category();
  list_categories_tree: TreeNodeCategory[] = [];
  list_categories_dropdown: Category[] = [];

  constructor(
    private toastService: ToastService,
    private inventarioService: InventarioService,
    private confirmDialogService: ConfirmDialogService,
    authService: AuthService
  ) { super(authService, Modules.inventario) }
  /**
   *VISTA MINIMALISTA DE ARBOLES
   *
   * @readonly
   * @type {string}
   * @memberof CategoryComponent
   */
  get tree_minimalist_category(): string {
    return this.list_categories_dropdown.find(category => category.id == this.category.father_category_id)
      ?.tree_minimalist ?? 'Sin categoría hija';
  }
  ngOnInit(): void {

    this.personalizedView({
      create: true,
      create_label: 'Crear categoría',
      search: false,
      descartar: false,
      delete: false,
      archivar: false
    })
    this.getCategoryTree()
  }
  /**
   *llama al servicio para listar las categorias en arbol
   *
   * @memberof CategoryComponent
   */
  getCategoryTree(): void {
    this.loading = true
    this.inventarioService.getCategoryTree().subscribe({
      next: (arrayTree) => {
        this.list_categories_tree = arrayTree
        this.loading = false
      },
      error: (err) => {
        this.toastService.error('Error en árbol de categorías')
        this.loading = false
      }
    })
  }

  /**
   *Obtiene las categorias de inventario service
   *
   * @return {void} No return value, updates the list_categories property.
   */
  getCategories(): void {
    this.loading = true
    this.inventarioService.getCategories().subscribe({
      next: (res) => {
        if (res.length != 0) {
          this.category.father_category_id = res[0].id
          this.list_categories_dropdown = res;
        }

        this.loading = false
      },
      error: (err) => {
        this.toastService.error('Error en listar categorías')
        this.loading = false
      },
    })
  }
  saveCategory() {
    if (!this.validateForm()) return
    console.log(this.category);
    
    //dialog de confirmacion
    this.confirmDialogService.confirm({
      title: 'Advertencia',
      message: `¿Desea asignar la categoría ${this.category.name.toLocaleUpperCase()} 
      siendo hijo de la categoría
       ${this.category.father_category_id}?`
    }).subscribe(accept => {
      if (accept) {//*CONFIRMAR ACCION

        this.category.father_category_id = this.category.father_category_id !== null ?
          parseInt(this.category.father_category_id.toString()) : null;

        //EJECUTA EL SERVICIO
        this.inventarioService.createCategory(this.category).subscribe({
          next: (res) => {

            this.getCategoryTree()
            this.toastService.success('Categoría creada');

          },
          error: (err) => {
            this.toastService.error('Error en categoría')
          },
        })
      }
      this.category = new Category();
    })
  }
  /**
   *Válida el formulario
   *
   * @return {*}  {boolean}
   * @memberof CategoryComponent
   */
  validateForm(): boolean {
    let pass = true
    if (!this.category.name.trim()) {
      pass = false
      this.toastService.warning('Campo "Nombre categoría vacío"')
    }
    return pass
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
   *Despliega el modal y consume el servicio de la lista de categorías
   *
   * @memberof CategoryComponent
   */
  openModalCategory(dynamic_modal: DynamicModalComponent): void {
    this.getCategories()
    dynamic_modal.openAndCloseModal()
  }

  /**
   *Descarta la categoria y reinicia el formulario
   *
   * @param {DynamicModalComponent} [dynamic_modal]
   * @memberof CategoryComponent
   */
  discardCategory(dynamic_modal?: DynamicModalComponent): void {
    this.category = new Category()
    dynamic_modal?.openAndCloseModal()
  }
  /**
   *Prepara la edicion de la categoria
   *
   * @param {TreeNodeCategory} category
   * @memberof CategoryComponent
   */
  editCategory(category: TreeNodeCategory): void {
    this.category = category
    this.dynamic_modal.openAndCloseModal()
    this.getCategories()

  }
  /**
   *prepara la eliminacion de la categoria
   *
   * @param {TreeNodeCategory} category
   * @memberof CategoryComponent
   */
  deleteCategory(category: TreeNodeCategory): void {
    console.log(category);
  }
}
