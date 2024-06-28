import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/components/login/services/Auth.service';
import { Modules } from 'src/app/enum/Modules';
import { Access } from 'src/app/models/Access';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Moneda, Tasa } from '../../../models/Moneda.model';
import { Columns } from 'src/app/interfaces/ConfigsFormsData.interface';
import { MonedasService } from '../../../services/monedas.service';
import { DynamicTableComponent } from 'src/app/components/dynamic-table/dynamic-table.component';
import { DynamicModalComponent } from 'src/app/components/dynamic-modal/dynamic-modal.component';
import { TasasComponent } from 'src/app/components/tasas/tasas.component';

@Component({
  selector: 'app-monedas-crud',
  templateUrl: './monedas-crud.component.html',
  styleUrls: ['./monedas-crud.component.scss']
})
export class MonedasCrudComponent implements OnInit {

  /**
   *referencia de la tabla monedas
   *
   * @type {DynamicTableComponent}
   * @memberof MonedasCrudComponent
   */
  @ViewChild('table_monedas') table_monedas!: DynamicTableComponent

  /**
   *modal de tasas
   *
   * @type {DynamicModalComponent}
   * @memberof MonedasCrudComponent
   */
  @ViewChild('dynamic_modal') dynamic_modal!: DynamicModalComponent
  access: Access = new Access();
  moneda: Moneda = new Moneda();

  /**
   *Componente tasas
   *
   * @type {TasasComponent}
   * @memberof MonedasCrudComponent
   */
  tasasComponent: TasasComponent = new TasasComponent()
  tasa: Tasa = new Tasa();

  loading: boolean = false;

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
  /**
   *seleccionar moneda
   *
   * @param {Moneda} event
   * @memberof MonedasCrudComponent
   */
  selectMoneda(event: Moneda) {
    this.moneda = event
    this.table_monedas.openAndCloseModal()
  }
  /**
   *selecciona una tasas
   *
   * @param {Tasa} tasas
   * @memberof MonedasCrudComponent
   */
  selectTasa(tasa: Tasa) {
    this.dynamic_modal.openAndCloseModal()
    this.tasa = Object.assign({}, tasa);
  }

  /**
   *Cepta el modal
   *
   * @memberof MonedasCrudComponent
   */
  aceptarModal() {
    

    this.tasa = this.tasasComponent.returnObjectComponent();

    console.log(this.tasa);
    
    this.dynamic_modal.openAndCloseModal()
  }
}
