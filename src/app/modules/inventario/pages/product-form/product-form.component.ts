import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/components/login/services/Auth.service';
import { Modules } from 'src/app/enum/Modules';
import { SelectInput } from 'src/app/interfaces/ConfigsFormsData.interface';
import { GeneralMenu } from 'src/app/models/Menu';
import { Category, PriceList, PriceListDetail } from '../../models/inventory.model';
import { AttributesProduct, DetailAttributes, Product } from '../../models/Product.model';
import { InventarioService } from '../../services/inventario.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { extractKeysForInput } from 'src/app/functions/Arrays';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent extends GeneralMenu implements OnInit {

  /**
  * Listado de modelos de productos para el select
   *
   * @type {AttributesProduct[]}
   * @memberof ProductFormComponent
   */
  simple_product_model_list: SelectInput = []

  /**
   *listado de modelos de productos
   *
   * @type {AttributesProduct[]}
   * @memberof ProductFormComponent
   */
  product_model_list: AttributesProduct[] = []

  /**
   *Listado de propiedades del formulario 
   *
   * @type {DetailAttributes[]}
   * @memberof ProductFormComponent
   */
  list_properties: DetailAttributes[] = []

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
   *Recursos de listas  de prcio categorioas etc  en el formularios
   *
   * @private
   * @memberof ProductFormComponent
   */
  private async loadResource() {
    this.loading = true
    await Promise.all([
      this.inventarioService.getCategories().toPromise().then((categories) => this.categoryList = categories as Category[]),
      this.inventarioService.getPriceList().toPromise().then((priceList) => this.priceListArray = priceList as PriceList[]),
      //MODELO DE PRODUCTOS
      this.inventarioService.geAttributesProducts().toPromise().then((modelProduct) => {
        this.product_model_list = modelProduct as AttributesProduct[]
        this.simple_product_model_list = extractKeysForInput(this.product_model_list)
        this.product.product_model_key = this.product_model_list[0].id
        this.changeModelProduct(this.product_model_list[0].id)

      }),

    ]).finally(() => {
      this.setValuesSelect()
      this.loading = false
    }).catch((error) => {
      this.loading = false
      console.log(error);
      this.toastService.error('Error al cargar categorías y listas de precios')
    })
  }

  /**
   * Cambia el modelo de producto en el formulario y actualiza 
   * la lista de propiedades que se va a mostrar
   *
   * @param {number} id_model ID del modelo de producto a cambiar
   * @memberof ProductFormComponent
   */
  changeModelProduct(id_model: number) {
    let index = this.product_model_list.findIndex(model => model.id == id_model)
    this.list_properties = this.product_model_list[index].properties
  }

  /**
   *REFRESCA le formulario 
   *
   * @memberof ProductFormComponent
   */
  refreshModel() {
    this.createOrEditMode()
  }
  saveProduct() {
    this.product.categoria = this.categoryList.find(category => category.id == this.product.category_id)?.name as string

    let price_list_detail = this.product.price_list.price_list_details[0]

    this.product.price_list = this.priceListArray.find(priceList => priceList.id == this.product.price_list.id) as PriceList
    this.product.price_list.price_list_details = [price_list_detail]


    this.product.detail_product = this.list_properties
    console.log(this.product)
  }

  /**
   * Setea los valores por defecto de los select en el formulario
   * Selecciona el primer elemento de las listas de categorias y lista de precios
   * y se lo asigna al producto
   * @memberof ProductFormComponent
   */
  setValuesSelect() {
    this.product.price_list.id = this.priceListArray[0].id
    this.product.category_id = this.categoryList[0].id

    //!iterar propiedades del producto detalles e iterarlas par asetear el valor 
  }


}
