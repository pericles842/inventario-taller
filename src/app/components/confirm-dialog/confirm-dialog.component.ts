import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogService } from './service/confirmDialog.service';

@Component({
  standalone: true,
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class ConfirmDialogComponent implements OnInit {

  title: string = 'Titulo';
  message: string = 'Mensaje';
  rejectLabel: string = 'Rechazar'
  acceptLabel: string = 'Aceptar'


  constructor(
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

  }

  /**
   *abre y cierra el modal
   *
   * @memberof ConfirmDialogComponent
   */
  openAndCloseModal( ) {
    //Crear un nuevo div
    const div = this.renderer.createElement('div');

    //Añadir los atributos necesarios para abrir el modal
    this.renderer.setAttribute(div, 'data-bs-toggle', 'modal');
    this.renderer.setAttribute(div, 'data-bs-target', '#conifirmDialogModal');
    // Añadir el div al body del documento
    this.renderer.appendChild(document.body, div);
    //Disparar el evento de clic en el div recién creado
    div.click();
    
    //Remover el div después de abrir el modal (opcional)
    setTimeout(() => {
      this.renderer.removeChild(document.body, div);
    }, 1000); // Ajusta el tiempo según sea necesario

  }

}
