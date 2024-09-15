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
    type?: 'boolean' | 'decimal' | 'fecha' | 'json' | 'bolder'
}

export interface TreeNodeCategory {
    id: number;
    name: string;
    father_category_id: number | null;
    user_id: number;
    children: TreeNodeCategory[];
    expanded: boolean;
}

//interfaz de capmpo seleccinable para los recursos
export type SelectInput = { id: number | string, name: string }[]
//Tipos de inputs
export type TypeInput = 'text' | 'email' | 'password' | 'number' | 'search' | 'date' | 'select' | 'checkbox' | 'color'