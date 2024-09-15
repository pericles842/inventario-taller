import { Component, OnInit, ViewChild } from '@angular/core';
import { GeneralMenu } from 'src/app/models/Menu';
import { InventarioService } from '../../services/inventario.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { AuthService } from 'src/app/components/login/services/Auth.service';
import { Modules } from 'src/app/enum/Modules';
import { Columns } from 'src/app/interfaces/ConfigsFormsData.interface';
import { AttributesProduct, DetailAttributes } from '../../models/Product.model';
import { DynamicTableComponent } from 'src/app/components/dynamic-table/dynamic-table.component';
import { DynamicModalComponent } from 'src/app/components/dynamic-modal/dynamic-modal.component';

@Component({
  selector: 'app-product-attributes',
  templateUrl: './product-attributes.component.html',
  styleUrls: ['./product-attributes.component.scss']
})
export class ProductAttributesComponent extends GeneralMenu implements OnInit {

  @ViewChild('table_products_attributes') table_products_attributes!: DynamicTableComponent
  @ViewChild('dynamic_modal') dynamic_modal!: DynamicModalComponent

  /**
   *Modleo de atributos personalizados
   *
   * @type {AttributesProduct}
   * @memberof ProductAttributesComponent
   */
  product_model: AttributesProduct = new AttributesProduct()
  products_attributes_list: AttributesProduct[] = []
  properties:DetailAttributes = new DetailAttributes()

  columns: Columns[] = []
  columns_attributes: Columns[] = []
  constructor(
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

  openFormProperties() {
    this.properties = new DetailAttributes()
    this.dynamic_modal.openAndCloseModal()
  }
  selectAttributes(atributos: DetailAttributes) {
    this.properties = atributos
    this.dynamic_modal.openAndCloseModal()
  }
}
