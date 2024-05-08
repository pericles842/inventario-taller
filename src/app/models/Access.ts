/**
 * permisologia de usuario
 *
 * @export
 * @class Access
 */
export class Access {
  authorized: boolean = false;
  create: boolean = false;
  delete: boolean = false;
  update: boolean = false;
  id: number = -1;
  label: string = '';
}