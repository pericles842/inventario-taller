import { Component, HostListener, OnInit } from '@angular/core';
import { ToastService } from './services/toast/toast.service';
import { environments } from 'environments/environment.local';
import { ConfirmDialogService } from './components/confirm-dialog/service/confirmDialog.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
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
  constructor(
    private toastService: ToastService,
    private confirmDialogService: ConfirmDialogService
  ) { }

  ngOnInit() {
    this.confirmDialogService.confirm({
      message: 'OLa mamaguebo pajuo',
      reject: () => {
        console.log('rejext');

      },
      accept: () => {
        console.log('acetp');

      }
    })
  }
  title = 'app';
}
