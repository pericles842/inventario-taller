import { ApplicationRef, ComponentFactoryResolver, ComponentRef, Injectable, Injector } from '@angular/core';
import { ConfirmDialogComponent } from '../confirm-dialog.component';
import { Subject } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class ConfirmDialogService {



    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private injector: Injector
    ) { }

    confirm() {
        // Crear el componente dinámicamente
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ConfirmDialogComponent);
        console.log(componentFactory);
        
        const componentRef = componentFactory.create(this.injector);

        
        // Adjuntar el componente al DOM
        this.appRef.attachView(componentRef.hostView);
        const domElem = (componentRef.hostView as any).rootNodes[0] as HTMLElement;
        
        componentRef.instance.title = 'SSSSSSSSSSSSSSSSSSSSS'

        document.body.appendChild(domElem);


        componentRef.instance.openAndCloseModal();
         
        

        // Limpiar el componente cuando sea necesario
        componentRef.onDestroy(() => {
            this.appRef.detachView(componentRef.hostView);
            componentRef.destroy();
        });
    }
}
