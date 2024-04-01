/**
 *Modelo Usuario
 *
 * @export
 * @class Usuario
 */
export class Usuario {
    id?: number = -1;
    full_name: string = '';
    email: string = '';
    ci: number = 0;
    direction: string = '';
    username: string = '';
    password: string = '';
    rol: number = -1;
    token?:string;
}