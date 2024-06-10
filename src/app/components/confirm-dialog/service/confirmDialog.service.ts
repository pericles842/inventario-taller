import { ApplicationRef, ComponentFactoryResolver, ComponentRef, EventEmitter, Injectable, Injector, Output } from '@angular/core';
import { ConfirmDialogComponent } from '../confirm-dialog.component';
import { Observable, Subject } from 'rxjs';
import { ConfirmDialog } from '../interface/ConfirmDialog';


@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {


  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) { }

  /**
   *Despliega un config dialog 
   *
   * @param {ConfirmDialog} config
   * @memberof ConfirmDialogService
   */
  confirm(config: ConfirmDialog): Observable<boolean> {
    return new Observable<boolean>(observer => {

      // Crear el componente dinámicamente
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ConfirmDialogComponent);
      const componentRef = componentFactory.create(this.injector);

      // Adjuntar el componente al DOM
      this.appRef.attachView(componentRef.hostView);
      const domElem = (componentRef.hostView as any).rootNodes[0] as HTMLElement;

      // Agregar el elemento al DOM
      document.body.appendChild(domElem);

      //componentRef.changeDetectorRef.detectChanges();
      componentRef.instance.message = config.message
      componentRef.instance.title = !config.title ? '' : config.title as string
      componentRef.instance.classIcon = !config.classIcon ? 'bi bi-exclamation-triangle-fill' : config.classIcon as string
      componentRef.instance.acceptLabel = !config.acceptLabel ? 'Aceptar' : config.acceptLabel as string
      componentRef.instance.rejectLabel = !config.rejectLabel ? 'Rechazar' : config.rejectLabel as string
      componentRef.instance.closeDialog = !config.closeDialog ? false : config.closeDialog as boolean

      //Abrir o cerrar el modal
      componentRef.instance.openAndCloseModal();

      //CLICK EN ACEPTAR MODAL
      componentRef.instance.acceptEvent.subscribe(() => {
        observer.next(true);
        observer.complete();
        componentRef.instance.openAndCloseModal();
      });

      //CLICK EN RECHAZAR MODAL
      componentRef.instance.rejectEvent.subscribe(() => {
        observer.next(false);
        observer.complete();
        componentRef.instance.openAndCloseModal();
      });

      // Limpiar el componente cuando sea necesario
      componentRef.onDestroy(() => {
        this.appRef.detachView(componentRef.hostView);
        componentRef.destroy();
      });

    });
  }

}
