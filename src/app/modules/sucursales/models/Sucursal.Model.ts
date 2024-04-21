
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

  constructor(not_in_charge: boolean = false) {
    if (not_in_charge) {
      this.cargo = 'No asignado'
      this.fulL_name = 'Encargado no asignado'
    }
  }
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