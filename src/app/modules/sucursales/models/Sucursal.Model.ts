
export class Sucursal {
  sucursal_id: number = -1
  typeBranch!: typeBranch['typeBranch']
  name: string = ''
  direction: string = ''
  user_id: number = -1
  fulL_name: string = ''
  cargo: string = ''
  rol_id: number = -1
  email: string = ''
}

/**
 *Tipos de sucursales
 *
 * @export
 * @interface typeBranch
 */
export interface typeBranch {
  typeBranch: 'almacen' | 'tienda'
}