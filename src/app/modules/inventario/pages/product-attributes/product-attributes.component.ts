import { Component, OnInit, ViewChild } from '@angular/core';
import { GeneralMenu } from 'src/app/models/Menu';
import { InventarioService } from '../../services/inventario.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { AuthService } from 'src/app/components/login/services/Auth.service';
import { Modules } from 'src/app/enum/Modules';
import { Columns, ExtraButtons } from 'src/app/interfaces/ConfigsFormsData.interface';
import { AttributesProduct, DetailAttributes } from '../../models/Product.model';
import { DynamicTableComponent } from 'src/app/components/dynamic-table/dynamic-table.component';
import { DynamicModalComponent } from 'src/app/components/dynamic-modal/dynamic-modal.component';
import { LabelsFormProprieties } from '../../models/LabelsForm.model';
import { ConfirmDialogService } from 'src/app/components/confirm-dialog/service/confirmDialog.service';

@Component({
  selector: 'app-product-attributes',
  templateUrl: './product-attributes.component.html',
  styleUrls: ['./product-attributes.component.scss']
})
export class ProductAttributesComponent extends GeneralMenu implements OnInit {

  @ViewChild('table_products_attributes') table_products_attributes!: DynamicTableComponent
  @ViewChild('dynamic_modal') dynamic_modal!: DynamicModalComponent

  labelsInComponent = new LabelsFormProprieties('form')
  
  /**
   *Botones adicionales del formulario !IMPORTANTE RESOLVER PROBLEMA DEL ACCESO
   *
   * @type {ExtraButtons[]}
   * @memberof ProductAttributesComponent
   */
  extraButtons: ExtraButtons[] = [
    {
      id: 1,
      icon: 'bi bi-eye-fill',
      class: 'text-info ',
      disabled: this.disabled,
      description: 'Ver modelo en un formulario',
      action: () => {
        this.labelsInComponent = new LabelsFormProprieties('preview')
        this.formPreview()
      }
    }
  ]

  /**
   *Modleo de atributos personalizados
   *
   * @type {AttributesProduct}
   * @memberof ProductAttributesComponent
   */
  product_model: AttributesProduct = new AttributesProduct()
  products_attributes_list: AttributesProduct[] = []
  properties: DetailAttributes = new DetailAttributes()

  columns: Columns[] = []
  columns_attributes: Columns[] = []
  constructor(
    private confirmDialogService: ConfirmDialogService,
    private inventarioService: InventarioService,
    private toastService: ToastService,
    authService: AuthService) {
    super(authService, Modules.atributos_productos)

  }

  ngOnInit(): void {

    this.columns = this.inventarioService.columns_attributes_product_details
    this.columns_attributes = this.inventarioService.columns_attributes_product
  }

  /**
   * Obtiene la lista de atributos personalizados de los productos
   * y los almacena en products_attributes_list
   *
   * @memberof ProductAttributesComponent
   */
  getAttributeProductsList() {
    this.loading = true
    this.inventarioService.geAttributesProducts().subscribe({
      next: (data) => {
        this.products_attributes_list = data
        this.table_products_attributes.openAndCloseModal()
        this.loading = false

      },
      error: (err) => {
        this.loading = false
        this.toastService.error('Error al cargar atributos')
      }
    })
  }
  refreshModel() {
    this.createOrEditMode()
  }

  /**
   * Selecciona un atributo de el listado de la tabla
   *
   * @param {AttributesProduct} atributos
   * @memberof ProductAttributesComponent
   */
  selectItem(atributos: AttributesProduct) {
    this.product_model = atributos
    this.table_products_attributes.openAndCloseModal()
    this.totalMenu()
  }
  /**
   *Levanta el modal de propiedades
   *
   * @memberof ProductAttributesComponent
   */
  openFormProperties() {
    this.labelsInComponent = new LabelsFormProprieties('form')
    this.properties = new DetailAttributes()
    this.dynamic_modal.openAndCloseModal()
  }
  /**
   *asigna el registro al valor de la tabla 
   *
   * @param {DetailAttributes} atributos
   * @memberof ProductAttributesComponent
   */
  selectAttributes(atributos: DetailAttributes) {
    this.labelsInComponent = new LabelsFormProprieties('form')
    this.properties = atributos
    this.dynamic_modal.openAndCloseModal()
  }
  saveProprieties() {
    const index = this.product_model.properties.findIndex(prop => prop.key === this.properties.key);

    if (index === -1) {
      this.product_model.properties.push({ ...this.properties });
    } else {
      this.product_model.properties[index] = { ...this.properties };
    }

    this.saveModelProduct(true)

  }

  /**
   * Guarda el modelo de atributos
   *
   * @param {boolean} [closeModalAttributes=false] cerrar modal de atributos
   * @memberof ProductAttributesComponent
   */
  saveModelProduct(closeModalAttributes: boolean = false) {
    this.loading = true
    this.inventarioService.createProductProperties(this.product_model).subscribe({
      next: (model_product) => {
        this.product_model = model_product
        this.properties = new DetailAttributes()
        this.toastService.success('Modelo creado con éxito')

        if (closeModalAttributes) this.dynamic_modal.openAndCloseModal()
        this.presentation()
        this.loading = false

      },
      error: (err) => {
        console.log(err);
        this.toastService.error('Error al guardar atributos')
        this.loading = false
      }
    })
  }

  /**
   *Limpia el fomrulario y se devuelve a modo presentacion
   *
   * @memberof ProductAttributesComponent
   */
  discardForm() {
    this.product_model = new AttributesProduct()
    this.properties = new DetailAttributes()
    this.presentation()
  }

  formPreview() {
    this.dynamic_modal.openAndCloseModal()
  }

  deletePropertied(property: DetailAttributes) {
    this.confirmDialogService.showAlert(`¿Desea eliminar el atributo ${property.name_attributes}?`).then((result) => {
      if (result.isConfirmed) {

        const index = this.product_model.properties.findIndex(prop => prop.key === property.key);
        this.product_model.properties.splice(index, 1);

        this.inventarioService.createProductProperties(this.product_model).subscribe({
          next: (model_product) => {

            this.product_model = model_product
            this.properties = new DetailAttributes()

            this.toastService.success('Modelo eliminado con éxito')
            this.loading = false
          },
          error: (err) => {
            console.log(err);
            this.toastService.error('Error al guardar atributos')
            this.loading = false
          }
        })

      }
    })
  }
}
