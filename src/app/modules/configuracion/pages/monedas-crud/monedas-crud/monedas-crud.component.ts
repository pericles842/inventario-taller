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
import { GeneralMenu } from 'src/app/models/Menu';
import { oneFirsUppercase } from 'src/app/functions/Words';
import { ConfirmDialogService } from 'src/app/components/confirm-dialog/service/confirmDialog.service';

@Component({
  selector: 'app-monedas-crud',
  templateUrl: './monedas-crud.component.html',
  styleUrls: ['./monedas-crud.component.scss']
})
export class MonedasCrudComponent extends GeneralMenu implements OnInit {

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
    private monedasService: MonedasService,
    private confirmDialogService: ConfirmDialogService
  ) { super() }

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
    this.totalMenu()
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
   * llama al servicio actualizar tasas y cierra el modal
   *
   * @memberof MonedasCrudComponent
   */
  aceptarModal() {
    this.loading = true

    let { id, price } = this.tasa
    this.monedasService.updateCurrencyPrice(id, price).subscribe({
      next: (response) => {
        let { price } = response
        //buscamos index
        let index = this.moneda.tasas.findIndex(item => item.id == id)
        //asignamos precio nuevo
        this.moneda.tasas[index].price = price
        this.loading = false
        this.toastService.success('Tasa actualizada con éxito')
      },
      error: (err) => {
        this.loading = false
        this.toastService.error('Error en actualizar tasa')
      },
    })
    this.dynamic_modal.openAndCloseModal()
  }

  /**
   *guarda una moneda
   *
   * @memberof MonedasCrudComponent
   */
  saveCurrency() {
    if (!this.validateForm()) return

    this.loading = true
    let { id, iso, name, default: por_defecto, tasas } = this.moneda;
    name = oneFirsUppercase(this.moneda.name)

    this.monedasService.saveNewCurrency(iso, name, por_defecto, id).subscribe({
      next: (response) => {

        if (id == -1) {
          this.list_monedas.push({ id: response.id, iso, name, default: por_defecto, tasas })
          this.moneda.id = response.id
        } else {
          let index = this.list_monedas.findIndex(item => item.id == id)
          this.list_monedas[index] = { id, iso, name, default: por_defecto, tasas }
        }
        this.loading = false
        this.toastService.success('Moneda guardada correctamente')
        this.descartar()
      },
      error: (err) => {
        this.loading = false
        this.toastService.error('error al guardar moneda')
      },
    })
  }
  descartar() {
    this.moneda = new Moneda()
  }
  /**
   *Valida y elimina una moneda
   *
   * @memberof MonedasCrudComponent
   */
  deleteCurrency() {
    //modal de confirmación
    this.confirmDialogService.confirm({ message: "¿Seguro desea eliminar esta moneda?" }).subscribe({
      next: (confirmar) => {
        //confrimar
        if (confirmar) {
          //metodo eliminar
          this.loading = true
          this.monedasService.deleteCurrency(this.moneda.id).subscribe({
            next: (value) => {

              let index = this.list_monedas.findIndex(item => item.id = this.moneda.id)
              this.list_monedas.splice(index, 1)
              this.moneda = new Moneda()

              this.presentation()
              this.loading = false
            }, error: (err) => {
              this.loading = false
              this.toastService.error(err.error.text, 'Error al borrar moneda')
            },
          })
        }
      }, error(err) {
        console.log(err);
      },
    })
  }
  /**
   *Valida el formulario
   *
   * @return {*}  {boolean}
   * @memberof MonedasCrudComponent
   */
  validateForm(): boolean {
    let pass = true
    if (this.moneda.name.trim() == '') {

      pass = false
      this.toastService.warning('Campo "Nombre Moneda vació"')
    } else if (this.moneda.iso.trim() == '') {

      pass = false
      this.toastService.warning('Campo "iso" vació')
    }

    return pass
  }
}
