/**
 *retorna una fecha  compatible para el input tipo date, el resultado es 'yyyy-mm-dd'
 *
 * @export
 * @param {Date} date 
 * @return {*} 
 */
export function setDateInput(date: Date) {
    return date.toISOString().split('T')[0]
}