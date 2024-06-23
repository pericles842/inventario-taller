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
    price: number = 0;
    created_at: Date = new Date()
}   