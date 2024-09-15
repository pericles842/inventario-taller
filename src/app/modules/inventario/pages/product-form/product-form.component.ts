import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/components/login/services/Auth.service';
import { Modules } from 'src/app/enum/Modules';
import { SelectInput } from 'src/app/interfaces/ConfigsFormsData.interface';
import { GeneralMenu } from 'src/app/models/Menu';
import { Category, PriceList, PriceListDetail } from '../../models/inventory.model';
import { Product } from '../../models/Product.model';
import { InventarioService } from '../../services/inventario.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent extends GeneralMenu implements OnInit {

  /**
   *Tipos de producto unitario o compuesto
   *
   * @type {SelectInput}
   * @memberof ProductFormComponent
   */
  type_product_list: SelectInput = [
    { id: 'unit_product', name: 'Producto Unitario' },
    { id: 'composite_product', name: 'Producto Compuesto' },
  ]

  /**
   *Claseficacion del producto Puede ir a la venta o almacen  
   *
   * @type {SelectInput}
   * @memberof ProductFormComponent
   */
  product_classification_list: SelectInput = [
    { id: 'marketable_product', name: 'Producto Comercial' },
    { id: 'primary_product', name: 'Producto Primario' },
  ]
  /**
   *Listado de categorias
   *
   * @type {Category[]}
   * @memberof ProductFormComponent
   */
  categoryList: Category[] = []

  /**
   *tallas
   *
   * @type {SelectInput}
   * @memberof ProductFormComponent
   */
  tallasList: SelectInput = [
    { id: 'S', name: 'S' },
    { id: 'M', name: 'M' },
    { id: 'L', name: 'L' },
    { id: 'XL', name: 'XL' },
    { id: 'XXL', name: 'XXL' },
  ]
  priceListArray: PriceList[] = []

  product: Product = new Product()

  constructor(
    private inventarioService: InventarioService,
    private toastService: ToastService,
    authService: AuthService) {
    super(authService, Modules.productos)
  }



  ngOnInit(): void {
    // 
    this.product.price_list.price_list_details = [new PriceListDetail()]
    this.loadResource()


  }

  /**
   *oBTIENE LOS RECURSOS
   *
   * @private
   * @memberof ProductFormComponent
   */
  private async loadResource() {
    this.loading = true
    await Promise.all([
      this.inventarioService.getCategories().toPromise().then((categories) => this.categoryList = categories as Category[]),
      this.inventarioService.getPriceList().toPromise().then((priceList) => this.priceListArray = priceList as PriceList[]),

    ]).finally(() => this.loading = false).catch((error) => {
      this.loading = false
      console.log(error);
      this.toastService.error('Error al cargar categorías y listas de precios')
    })
  }

  refreshModel() {
    this.createOrEditMode()
  }
  saveProduct() {
    console.log(this.product)
  }
}
