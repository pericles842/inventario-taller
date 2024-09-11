import { setDateInput } from "src/app/functions/DateTransform"

/**
 * Categoría modelo
 *
 * @export
 * @class Category
 */
export class Category {
	id: number = 0
	name: string = ''
	father_category_id: number | null = 0
	user_id: number = 0
	tree_minimalist?: string = ''
}

export class PriceList {
	id: number = 0
	name: string = ''
	description: string = ''
	fecha_inicio: string = setDateInput(new Date())
	fecha_fin: string = ''
	user_id: number = 0
	price_list_details: PriceListDetail[] = [new PriceListDetail()]

}

export class PriceListDetail {
	id: number = 0
	quantity: number = 0
	product_name: string = ''
	categoria: string = ''
	price: number = 0
	net_price: number = 30
	discount: number = 0
	iva: string = '12'
	price_list_id: number = 0
	product_id: number = 0
	user_id: number = 0
	active_discount: boolean = false
}