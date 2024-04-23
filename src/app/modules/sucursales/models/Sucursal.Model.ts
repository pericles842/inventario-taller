
export class Sucursal {
  sucursal_id: number = -1
  typeBranch!: typeBranch['typeBranch']
  name: string = ''
  direction: string = ''
  user_id: number = -1
  name_user: string = ''
  cargo: string = ''
  rol_id: number = -1
  email: string = ''
  check: boolean = false

  constructor(not_in_charge: boolean = false) {
    if (not_in_charge) {
      this.cargo = 'No asignado'
      this.name_user = 'Encargado no asignado'
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