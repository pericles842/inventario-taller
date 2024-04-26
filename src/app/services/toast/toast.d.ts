
/**
 *OPciones del toast
 *
 * @export
 * @interface ToastOptions
 */
export interface ToastOptions {
    closeButton: boolean,         // Muestra un botón de cierre en la notificación
    debug: boolean,              // Activa la salida de depuración en la consola
    disableTimeOut: boolean,     // Desactiva el tiempo de espera automático
    timeOut: number,             // Duración de la notificación en milisegundos (5 segundos por defecto)
    extendedTimeOut: number,     // Duración extendida de la notificación en milisegundos
    progressBar: boolean,         // Muestra una barra de progreso
    progressAnimation: 'decreasing' | 'increasing', // Animación de la barra de progreso ('increasing', 'decreasing')
    tapToDismiss: boolean,        // Cerrar la notificación al hacer clic en ella
    toastClass: string,             // Clase de estilo para la notificación
    positionClass: PositionToast['positionClass'], // Clase de posición para la notificación
    easing: 'ease-in',         // Función de aceleración CSS para las animaciones
    enableHtml: boolean,         // Permite el uso de HTML en el título y el mensaje de la notificación
    newestOnTop: boolean,         // Muestra las notificaciones más recientes en la parte superior
    preventDuplicates: boolean,  // Evita la duplicación de notificaciones
    maxOpened: number,              // Número máximo de notificaciones abiertas simultáneamente (0 para ilimitado)
    autoDismiss: boolean,         // Desactiva automáticamente las notificaciones al navegar
    iconClasses: iconToast,
    data: null                 // Datos adicionales para pasar a la plantilla de notificación personalizada
}
/**
 *Posision del toast
 *
 * @export
 * @interface PositionToast
 */
export interface PositionToast {
    positionClass: 'toast-top-right' |    // Esquina superior derecha
    'toast-top-left' | // Esquina superior izquierda
    'toast-bottom-right' |  // Esquina inferior derecha
    'toast-bottom-left' |  // Esquina inferior izquierda
    'toast-top-full-width' |  // Parte superior ancho completo
    'toast-bottom-full-width' | // Parte inferior  ancho completo
    'toast-top-center' |  // Centro superior
    'toast-bottom-center'   // Centro inferior
}

/**
 *Iconos predeterminados del toast
 *
 * @export
 * @interface iconToast
 */
export interface iconToast {
    error: 'toast-error' | string,
    info: 'toast-info' | string,
    success: 'toast-success' | string,
    warning: 'toast-warning' | string
}

export interface OnToastService {
    success(msg: string, title: string, options?: ToastOptions): any
    error(msg: string, title: string, options?: ToastOptions): any
    warning(msg: string, title: string, options?: ToastOptions): any
    info(msg: string, title: string, options?: ToastOptions): any
}
