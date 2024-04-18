import { Usuario } from "../../usuarios/models/UsuariosModel"

export class Sucursal {
  id: number = -1
  typeBranch!: typeBranch['typeBranch']
  name: string = ''
  direction: string = ''
  users: Usuario[] = []
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