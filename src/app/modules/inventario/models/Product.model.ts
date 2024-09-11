import { PriceList, PriceListDetail } from "./inventory.model";

export class Product {
    /**
     * Clase de producto 
     * marketable_product:Para la venta
     * primary_product:Producto primario
     *
     * @type {('marketable_product' | 'primary_product')}
     * @memberof Product
     */
    product_class: 'marketable_product' | 'primary_product' = 'marketable_product'

    /**
     * 
     * Tipo de producto unitario o compuesto
     * unit_product:Producto unitario
     * composite_product:Producto compuesto
     *
     * @type {('unit_product' | 'composite_product')}
     * @memberof Product
     */
    type_product: 'unit_product' | 'composite_product' = 'unit_product'

    id_product: number = 0
    name_product: string = ''
    categoria: string = ''
    category_id: number = 0
    reference: string = ''
    talla: string = ''
    sku: string = '' 
    color: string = '#3B3B3B'
    price_list: PriceList = new PriceList()
    production_product_elements?: { [key: string]: string | number }[] = []


}
