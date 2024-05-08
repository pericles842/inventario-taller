import { Component, HostListener } from '@angular/core';
import { ToastService } from './services/toast/toast.service';
import { environments } from 'environments/environment.local';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //evalua maus y los controles del teclado
  @HostListener('document:contextmenu', ['$event'])
  @HostListener('document:keydown', ['$event'])
  handleEvent(event: MouseEvent | KeyboardEvent) {
    if ((event instanceof MouseEvent) ||
      (event instanceof KeyboardEvent &&
        (event.key === 'F12' || (event.ctrlKey && event.shiftKey && event.key === 'I')) &&
        environments.configuration != 'local')) {

      event.preventDefault();
      event.stopPropagation();
      //configurar toas para que nsalgan muchos
      this.toastService.warning('El acceso a las herramientas de desarrollo está bloqueado.');
    }
  }
  constructor(private toastService: ToastService) { }
  title = 'app';
}
