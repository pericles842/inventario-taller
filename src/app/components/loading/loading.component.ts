import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  imports: [
    CommonModule
  ]
})
export class LoadingComponent {
  @Input() loading = false;

  /**
   *Detecta la carga y desabilita el scrrol
   *
   * @readonly
   * @memberof LoadingComponent
   */
  get loadingReturn() {

    document.body.style.overflow = this.loading ? 'hidden' : 'auto';

    return this.loading;
  }
}
