import { ApplicationRef, ComponentFactoryResolver, Injectable, Injector } from '@angular/core';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {


  constructor() { }

  showAlert(
    title: string,
    text?: string,
    icon: 'success' | 'error' | 'warning' | 'info' = 'warning',
    confirmButtonText: string = 'Confirmar',
    cancelButtonText: string = 'Descartar',
    confirmButtonColor: string = 'rgb(22, 160, 146)',
    cancelButtonColor: string = '#fa5838',
  ): Promise<any> {
    return Swal.fire({
      title,
      text,
      icon,
      showCancelButton: true,
      confirmButtonText,
      cancelButtonText,
      confirmButtonColor,
      cancelButtonColor,
      reverseButtons: true
    });
  }

}
