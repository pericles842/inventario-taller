/**
 * Categoría modelo
 *
 * @export
 * @class Category
 */
export class Category {
	id: number = 0
	name: string = ''
	father_category_id: number|null = 0
	user_id: number = 0
	tree_minimalist?: string = ''
}