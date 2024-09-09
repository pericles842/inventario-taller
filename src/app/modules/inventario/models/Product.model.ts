import { PriceListDetail } from "./inventory.model";

export class Product {
    id_product: number = 0
    name_product: string = ''
    categoria: string = ''
    category_id: number = 0
    type_product: string = ''
    reference: string = ''
    sku: string = ''
    color: string = ''
    price_list_detail: PriceListDetail = new PriceListDetail()
    production_product_elements?: { [key: string]: string | number }[] = []

}