import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/components/login/services/Auth.service';
import { Modules } from 'src/app/enum/Modules';
import { Access } from 'src/app/models/Access';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-monedas-crud',
  templateUrl: './monedas-crud.component.html',
  styleUrls: ['./monedas-crud.component.scss']
})
export class MonedasCrudComponent implements OnInit {

  access: Access = new Access();
  loading: boolean = false
  constructor(
    private authService: AuthService,
    private toastService: ToastService
  ) { }
  ngOnInit(): void {
    this.accessModule()
  }
  /**
   *Obtiene los permisos del usuario
   *
   * @memberof MonedasCrudComponent
   */
  accessModule() {
    this.loading = true
    this.authService.accessModule(Modules.monedas).subscribe({
      next: (access) => {
        this.access = access
        this.loading = false
      }, error: (err) => {
        this.loading = false
        this.toastService.error('Error en permisos')
      },
    })
  }
}
