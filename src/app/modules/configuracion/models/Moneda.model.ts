/**
 *Moneda del sistema
 *
 * @export
 * @class Moneda
 */
export class Moneda {
  id: number = -1;
  name: string = '';
  iso: string = '';
  default: boolean = false;
  tasas: Tasa[] = [];
}
/**
 *Tasas de la moneda
 *
 * @export
 * @class Tasa
 */
export class Tasa {
  id: number = -1;
  id_coin: number = -1;
  father_currency: string = '';
  price: number = 0;
  created_at: Date = new Date();
  updated_at: Date = new Date();

}


/**
 * petición para actualizar tasa
 *
 * @export
 * @type RequestUpdateTasa
 */
export type RequestUpdateTasa = { config: { id: number, price: number } }

/**
 * petición para crear o ataluzar una moneda
 *
 * @export
 * @type RequestUpdateTasa
 */
export type RequestCreateCurrency = { moneda: { iso: string, name: string, default: boolean, id: number | undefined } }

/**
 * respuesta de crear o actualizar monda
 *
 * @export
 * @type RequestUpdateTasa
 */
export type ResponseCreateCurrency = { iso: string, name: string, default: boolean, id: number }


export interface HttpTasaCreate {
  response: { id_coin: number, price: number, id: number }
  request: { config: { id_coin: number, price: number } }
}