import { SelectInput } from "../interfaces/ConfigsFormsData.interface";


/**
 * Funcion que extrae claves de un array de objetos, y devuelve un array
 * de objetos con claves id y name, que se pueden usar directamente en un
 * select de angular.
 *
 * @param {T[]} array - El array de objetos a procesar.
 * @param {string} [key1='id'] - La clave a extraer para el id.
 * @param {string} [key2='name'] - La clave a extraer para el nombre.
 * @returns {SelectInput} - Un array de objetos con id y name.
 */
export function extractKeysForInput<T>(array: T[], key: string = 'id', name: string = 'name'): SelectInput {
    return array.map((item: any) => ({
        id: item[key],
        name: item[name]
    }))
}


/**
 * Función que extrae claves de un array de objetos, y devuelve un array
 * de objetos con claves dinámicas, que se pueden usar directamente
 * 
 * @param {T[]} array - El array de objetos a procesar.
 * @param {string[]} keys - La clave a extraer para cada campo.
 * @returns {SelectInput[]} - Un array de objetos con claves dinamicas.
 */
export function extractValuesForArray<T>(array: T[], ...keys: string[]): { [key: string]: any }[] {
    return array.map((item: any) => {
        const obj: { [key: string]: any } = {};
        keys.forEach(key => obj[key] = item[key]);
        return obj;
    });
}
