import { SelectInput, TypeInput } from "src/app/interfaces/ConfigsFormsData.interface";
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
    sku: string = ''
    color: string = '#3B3B3B'
    price_list: PriceList = new PriceList()
    product_model_key?: number = 0
    detail_product: DetailAttributes[] = []


}

/**
 *Plnatilla de atributos para agregar atributos personalizados
 *
 * @export
 * @class AttributesProduct
 */
export class AttributesProduct {
    id: number = 0
    name: string = ''
    status_id: number = 0
    properties: DetailAttributes[] = []
}

/**
 *Modelo de atributos para un producto
 *
 * @export
 * @class DetailAttributes
 */
export class DetailAttributes {
    data: SelectInput | null = null
    name_attributes: string = ''
    type_input: TypeInput = 'text'
    description: string = ''
    key: string = ''
    value: string = ''
}
