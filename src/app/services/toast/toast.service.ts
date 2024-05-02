import { Injectable } from '@angular/core';
import * as toast from 'toastr';
import { OnToastService, ToastOptions } from './toast';
@Injectable({
  providedIn: 'root'
})
export class ToastService implements OnToastService {

  private options: ToastOptions = {
    closeButton: true,
    debug: false,
    disableTimeOut: false,
    timeOut: 3000,
    extendedTimeOut: 3000,
    progressBar: true,
    progressAnimation: 'decreasing',
    tapToDismiss: true,
    toastClass: 'ngx-toastr',
    positionClass: 'toast-top-right',
    easing: 'ease-in',
    enableHtml: true,
    newestOnTop: true,
    preventDuplicates: false,
    maxOpened: 2,
    autoDismiss: false,
    iconClasses: {
      error: 'toast-error',
      info: 'toast-info',
      success: 'toast-success',
      warning: 'toast-warning'
    },
    data: null
  };
  constructor() { }

  /**
   *Toast de exitoso
   *
   * @param {string} msg
   * @param {string} title
   * @param {*} [options=this.options]
   * @return {*} 
   * @memberof ToastService
   */
  success(msg: string, title: string = 'Éxito', options: ToastOptions = this.options) {
    return toast.success(msg, title, options);
  }

  /**
   *Toast de error
   *
   * @param {string} msg
   * @param {string} title
   * @param {ToastOptions} [options]
   * @return {*} 
   * @memberof ToastService
   */
  error(msg: string, title: string = 'Error', options: ToastOptions = this.options) {
    return toast.error(msg, title, options);
  }

  /**
   *toast de advertencia
   *
   * @param {string} msg
   * @param {string} title
   * @param {ToastOptions} [options]
   * @return {*} 
   * @memberof ToastService
   */
  warning(msg: string, title: string = 'Alerta', options: ToastOptions = this.options) {
    return toast.warning(msg, title, options);
  }

  /**
   *toast de eroor
   *
   * @param {string} msg
   * @param {string} title
   * @param {ToastOptions} [options]
   * @return {*} 
   * @memberof ToastService
   */
  info(msg: string, title: string = 'Información', options: ToastOptions = this.options) {
    return toast.info(msg, title, options);
  }
}
