import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/components/login/services/Auth.service';
import { Modules } from 'src/app/enum/Modules';
import { Access } from 'src/app/models/Access';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Moneda } from '../../../models/Moneda.model';
import { Columns } from 'src/app/interfaces/ConfigsFormsData.interface';
import { MonedasService } from '../../../services/monedas.service';
import { DynamicTableComponent } from 'src/app/components/dynamic-table/dynamic-table.component';

@Component({
  selector: 'app-monedas-crud',
  templateUrl: './monedas-crud.component.html',
  styleUrls: ['./monedas-crud.component.scss']
})
export class MonedasCrudComponent implements OnInit {

  @ViewChild('table_monedas') table_monedas!: DynamicTableComponent

  access: Access = new Access();
  loading: boolean = false;
  moneda: Moneda = new Moneda();

  columns_monedas: Columns[] = []
  columns_tasas: Columns[] = [];
  list_monedas: Moneda[] = [];

  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private monedasService: MonedasService
  ) { }

  ngOnInit(): void {
    this.accessModule()
    this.getCoins();
    this.columns_tasas = this.monedasService.columns_tasas
    this.columns_monedas = this.monedasService.columns_monedas
  }

  /**
   *Obtener todas monedas
   *
   * @memberof MonedasCrudComponent
   */
  getCoins() {
    this.monedasService.getConfiguredCoins().subscribe({
      next: (monedas) => {
        this.list_monedas = monedas
      },
      error: (err) => {
        this.toastService.error('Error en monedas')
      },
    })
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

  selectItem(event: Moneda) {
    this.moneda = event
    this.table_monedas.openAndCloseModal()
  }
}
