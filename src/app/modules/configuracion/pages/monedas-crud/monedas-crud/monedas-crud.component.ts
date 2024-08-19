import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmDialogService } from 'src/app/components/confirm-dialog/service/confirmDialog.service';
import { DynamicModalComponent } from 'src/app/components/dynamic-modal/dynamic-modal.component';
import { DynamicTableComponent } from 'src/app/components/dynamic-table/dynamic-table.component';
import { AuthService } from 'src/app/components/login/services/Auth.service';
import { TasasComponent } from 'src/app/components/tasas/tasas.component';
import { Modules } from 'src/app/enum/Modules';
import { oneFirsUppercase } from 'src/app/functions/Words';
import { Columns } from 'src/app/interfaces/ConfigsFormsData.interface';
import { GeneralMenu } from 'src/app/models/Menu';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Moneda, Tasa } from '../../../models/Moneda.model';
import { MonedasService } from '../../../services/monedas.service';

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

  moneda: Moneda = new Moneda();

  /**
   *Componente tasas
   *
   * @type {TasasComponent}
   * @memberof MonedasCrudComponent
   */
  tasasComponent: TasasComponent = new TasasComponent()
  tasa: Tasa = new Tasa();



  columns_monedas: Columns[] = []
  columns_tasas: Columns[] = [];
  list_monedas: Moneda[] = [];

  constructor(
    authService: AuthService,
    private toastService: ToastService,
    private monedasService: MonedasService,
    private confirmDialogService: ConfirmDialogService
  ) { super(authService, Modules.monedas) }

  ngOnInit(): void {

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
   *seleccionar moneda
   *
   * @param {Moneda} event
   * @memberof MonedasCrudComponent
   */
  selectMoneda(event: Moneda) {

    this.eliminarTasasViejas(event.tasas)
    this.moneda = event
    this.table_monedas.openAndCloseModal()
    this.totalMenu()
  }
  eliminarTasasViejas(tasas: Tasa[]) {
    if (tasas.length >= 7) {
      tasas.sort((a, b) => {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });
      let lastIndex = tasas.length - 1
      this.deleteTasaService(tasas[lastIndex].id)
      tasas.splice(lastIndex, 1)

    }
  }
  /**
   *Elimina una tasas
   *
   * @param {number} id_tasa
   * @memberof MonedasCrudComponent
   */
  deleteTasaService(id_tasa: number) {
    this.monedasService.deleteCurrency(id_tasa).subscribe({
      error: (err) => {
        this.toastService.error(err.error.text, 'Error en eliminar tasas')
      },
    })
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

    if (this.tasa.id == -1) {
      this.createTasa(this.moneda.id, this.tasa.price)
    } else {
      this.updateTasa(this.tasa.id, this.tasa.price)
    }
    this.dynamic_modal.openAndCloseModal()
  }
  /**
   *Actualiza una tasa
   *
   * @param {number} id tasas
   * @param {number} price
   * @memberof MonedasCrudComponent
   */
  updateTasa(id: number, price: number) {
    this.loading = true
    this.monedasService.updateCurrencyPrice(id, price).subscribe({
      next: (response) => {

        let { price } = response
        //buscamos index
        let index = this.moneda.tasas.findIndex(item => item.id == id)
        //asignamos precio nuevo
        this.moneda.tasas[index].price = price
        this.moneda.tasas[index].updated_at = new Date()
        this.loading = false
        this.toastService.success('Tasa actualizada con éxito')
      },
      error: (err) => {
        this.loading = false
        this.toastService.error('Error en actualizar tasa')
      },
    })
  }
  /**
   *Crear una tasas
   *
   * @param {number} id_coin id de la moneda padre
   * @param {number} price
   * @memberof MonedasCrudComponent
   */
  createTasa(id_coin: number, price: number) {
    this.loading = true
    this.monedasService.createCurrencyPrice(id_coin, price).subscribe({
      next: (response) => {

        let tasa = new Tasa()
        tasa.id = response.id
        tasa.price = response.price
        tasa.father_currency = this.moneda.name
        tasa.id_coin = this.moneda.id
        tasa.updated_at = new Date()
        tasa.updated_at = new Date()

        //asignamos precio nuevo
        this.moneda.tasas.push(tasa)
        this.loading = false
        this.toastService.success('Tasa creada con éxito')
      },
      error: (err) => {
        this.loading = false
        this.toastService.error('Error en actualizar tasa')
      },
    })
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
    this.presentation()
    this.moneda = new Moneda()
  }
  /**
   *Valida y elimina una moneda
   *
   * @memberof MonedasCrudComponent
   */
  deleteCurrency() {
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
  /**
   *Agregar una tasas nueva
   *
   * @memberof MonedasCrudComponent
   */
  addTasa() {

    if (!this.validateBtnAddTasa()) return
    if (!this.validateCreateTasa()) return
    let { id, name } = this.moneda

    this.tasa = new Tasa()
    this.tasa.father_currency = name
    this.tasa.id_coin = id

    this.dynamic_modal.openAndCloseModal()
  }
  /**
   *Valida el agregar tasas
   *
   * @return {*}  {boolean}
   * @memberof MonedasCrudComponent
   */
  validateBtnAddTasa(): boolean {
    let pass = true
    if (this.moneda.id == -1) {
      this.toastService.info('Por favor cree o seleccione una moneda')
      pass = false
    }

    return pass
  }
  /**
   *Valida si se puede crear otra tasa
   *
   * @return {*}  {boolean}
   * @memberof MonedasCrudComponent
   */
  validateCreateTasa(): boolean {
    let pass = true

    // Obtener la fecha de hoy en formato 'YYYY-MM-DD'
    let today = new Date().toISOString().slice(0, 10);

    // Verificar si alguna de las tasas tiene la misma fecha que hoy (solo día, mes y año)
    let tasas_fecha_hoy = this.moneda.tasas.some(item => {
      let fechaItem = new Date(item.created_at).toISOString().slice(0, 10);
      return fechaItem === today;
    });

    if (tasas_fecha_hoy) {
      this.toastService.warning('Mañana podrá crear una tasa con la fecha correspondiente', 'Numero máximo de tasas por hoy')
      pass = false
    }
    return pass;

  }
}
