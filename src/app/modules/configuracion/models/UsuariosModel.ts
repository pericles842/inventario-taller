/**
 *Modelo Usuario
 *
 * @export
 * @class Usuario
 */
export class Usuario {
    id: number = -1;
    name_user: string = '';
    email: string = '';
    ci: number = 0;
    direction: string = '';
    username: string = '';
    password: string = '';
    rol: number | string = 5;
    token?: string;
    name_rol: string = '';
    ci_as_username: boolean = false;
    repeat_password: string = '';
    archivado: number = 0;
}

export interface AuthUser extends Usuario {
    config: ConfigUser
}

export interface ConfigUser {
    id: number,
    iso: string,
    name: string
}