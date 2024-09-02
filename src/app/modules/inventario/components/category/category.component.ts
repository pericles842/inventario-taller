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
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { reduce } from 'rxjs';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent extends GeneralMenu implements OnInit {

  @ViewChild('dynamic_modal') dynamic_modal!: DynamicModalComponent
  @ViewChild('swal') swal!: SwalComponent

  category: Category = new Category();
  list_categories_tree: TreeNodeCategory[] = [];
  list_categories_dropdown: Category[] = [];
  config_tree: { search: string, displayed: boolean } = { search: '', displayed: true }

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
  get tree_minimalist_category(): Category | undefined {
    return this.list_categories_dropdown.find(category => category.id == this.category.father_category_id);
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
  getCategories(edit: boolean = false): void {
    this.loading = true
    this.inventarioService.getCategories().subscribe({
      next: (res) => {
        if (res.length == 0) return this.toastService.info('No hay categorías creadas')

        this.list_categories_dropdown = res;
        //eliminarmos categoria padre diuplicada en caso de existir
        this.eliminateDuplicateFather(this.category)
        this.assignParentCategory(edit)
        return this.loading = false

      },
      error: (err) => {
        this.toastService.error('Error en listar categorías')
        this.loading = false
      },
    })
  }
  /**
   *Guarda una categoría
   *
   * @memberof CategoryComponent
   */
  saveCategory() {
    if (!this.validateForm()) return

    this.confirmDialogService.showAlert(
      `Advertencia`,
      `¿Está seguro de que desea asignar la categoría "${this.category.name}"
       ${this.labelCategoryFather(this.category)}?`,
      'warning'
    ).then((result) => {
      if (result.isConfirmed) {
        this.category.father_category_id = this.category.father_category_id ? parseInt(this.category.father_category_id.toString()) : null;
        //EJECUTA EL SERVICIO
        this.inventarioService.createCategory(this.category).subscribe({
          next: (res) => {
            this.getCategoryTree()
            this.toastService.success('Categoría creada');
            this.dynamic_modal.openAndCloseModal()

          },
          error: (err) => {
            this.toastService.error('Error en categoría')
          },
        })
      }
    });
  }
  /**
   *label de catgegria padre
   *
   * @param {Category} categoria
   * @return {*} 
   * @memberof CategoryComponent
   */
  labelCategoryFather(categoria: Category) {
    let category = this.list_categories_dropdown.find(category => category.id == categoria.father_category_id)

    return category ? `como subcategoría de "${category?.name.toLocaleUpperCase()}"` : ''
  }
  /**
   *Elimina la categoria padre duplicadas, y no permite que una categoria padre se asigne a sus hijos
   *
   * @param {Category} categoria
   * @memberof CategoryComponent
   */
  eliminateDuplicateFather(categoria: Category): void {
    if (categoria.id == 0) return
    this.list_categories_dropdown = this.list_categories_dropdown.filter(category => {

      //!MEJOAR LAS VALIDACIONES PARA QUE UN PADRE NO PUEDA SER ASIGNADO A SUS HIJOS
      //elimina la categoria duplicada
      return categoria.id != category.id
      //eliminamos los hijos de esa categoria

      // return category.father_category_id == 0 || category.father_category_id == null 
    });


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
    this.category.father_category_id = 0

  }
  /**
   * Este metodo se ecarga de setar el father_category_id de la categoria
   *  dependiendo del modo editar o crear se guia por id 0 
   *  @param [edit=false] {boolean} indica si se esta editando o no,
   *  ES IMPORTANTE PARA NO SETEAR EL VALOR DE UNA CATEGORIA SIN PADRE AL EDITAR
   * @memberof CategoryComponent
   */
  assignParentCategory(edit: boolean = false): any {

    const isCategoryNew = this.category.id === 0; //es nueva categoria
    const hasNoFatherCategory = this.category.father_category_id == 0; //no tiene categoria padre

    //*SI LA CATEGORIA ES NUEVA y no tiene categoria padre 
    if ((!isCategoryNew || isCategoryNew) && hasNoFatherCategory) {

      //* no tiene categoria padre pero esta en modo creando
      if (hasNoFatherCategory && !edit) {
        //asignamos  primer elemento de la lista a father_category_id
        this.category.father_category_id = this.list_categories_dropdown[0].id;
      } else this.eliminateFatherCategory(); //asignamos eliminamos categoria padre

      //*SI LA CATEGORIA NO ES NUEVA y TIENE CATEGORIA PADRE
    } else if (!isCategoryNew && !hasNoFatherCategory) {
      const selectedCategory = this.list_categories_dropdown.find(categoria => categoria.id === this.category.father_category_id);
      this.category.father_category_id = selectedCategory ? selectedCategory.id : this.category.father_category_id;
    }
  }

  /**
   *Despliega el modal y consume el servicio de la lista de categorías
   *
   * @memberof CategoryComponent
   */
  openModalCategory(dynamic_modal: DynamicModalComponent): void {
    this.category = new Category()
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
    //* clonamos la categoria para no editar el nodo original
    this.category = { ...category }
    this.category.father_category_id = this.category.father_category_id ?? 0;
    this.getCategories(true)
    this.dynamic_modal.openAndCloseModal()
  }
  /**
   *prepara la eliminacion de la categoria
   *
   * @param {TreeNodeCategory} category
   * @memberof CategoryComponent
   */
  deleteCategory(category: TreeNodeCategory): void {

    this.confirmDialogService.showAlert(
      'Advertencia',
      `Esta seguro que desea eliminar la categoria "${category.name}" se eliminaran las subcategorias`
    ).then((result) => {
      if (result.isConfirmed) {
        this.inventarioService.deleteCategory(category.id).subscribe({
          next: (res) => {
            this.getCategoryTree()
            this.getCategories()
            this.category = new Category()
            this.toastService.success('Categoría eliminada')
          },
          error: (err) => {
            this.loading = false
            this.toastService.error('Error en eliminar categoría')
          },
        })
      }
    })
  }
}
