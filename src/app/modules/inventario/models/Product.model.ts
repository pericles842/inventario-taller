import { PriceList, PriceListDetail } from "./inventory.model";

export class Product {
    id_product: number = 0
    name_product: string = ''
    categoria: string = ''
    category_id: number = 0
    type_product: 'sale' | 'production' = 'sale'
    reference: string = ''
    talla: string = ''
    sku: string = ''
    color: string = '#006eff'
    price_list: PriceList = new PriceList()
    production_product_elements?: { [key: string]: string | number }[] = []


}
