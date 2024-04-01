import { Component } from '@angular/core';
import * as toastr from 'toastr';

@Component({
  standalone: true,
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {

  showSuccess(): void {
    toastr.success('Mensaje de éxito');
  }

  showTopCenter(): void {
    toastr.info('Mensaje en la parte superior central', '', { positionClass: 'toast-top-left' });
  }

}
