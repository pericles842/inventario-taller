/**
 *Configuración de columnas
 *
 * @export
 * @interface Columns
 */
export interface Columns {
    label: string,
    key: string,
    visible?: boolean
    filterable?: boolean
    type?: 'boolean' | 'decimal' | 'fecha'
}

export interface TreeNodeCategory {
    id: number;
    name: string;
    father_category_id: number | null;
    user_id: number;
    children: TreeNodeCategory[];
    expanded: boolean;
}

export type SelectInput  = { id: number|string, name: string }[] 