import { Component, OnInit } from '@angular/core';
import { GeneralMenu } from 'src/app/models/Menu';
import { InventarioService } from '../../services/inventario.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { AuthService } from 'src/app/components/login/services/Auth.service';
import { Modules } from 'src/app/enum/Modules';
import { Columns } from 'src/app/interfaces/ConfigsFormsData.interface';
import { AttributesProduct } from '../../models/Product.model';

@Component({
  selector: 'app-product-attributes',
  templateUrl: './product-attributes.component.html',
  styleUrls: ['./product-attributes.component.scss']
})
export class ProductAttributesComponent extends GeneralMenu implements OnInit {

  /**
   *Modleo de atributos personalizados
   *
   * @type {AttributesProduct}
   * @memberof ProductAttributesComponent
   */
  product_model: AttributesProduct = new AttributesProduct()
  products_attributes_list: AttributesProduct[] = []

  columns: Columns[] = []

  constructor(
    private inventarioService: InventarioService,
    private toastService: ToastService,
    authService: AuthService) {
    super(authService, Modules.atributos_productos)
  }

  ngOnInit(): void {
    this.columns = this.inventarioService.columns_attributes_product
    this.getAttributeProductsList()
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
}
