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