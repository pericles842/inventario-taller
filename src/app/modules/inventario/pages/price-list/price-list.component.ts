import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/components/login/services/Auth.service';
import { Modules } from 'src/app/enum/Modules';
import { GeneralMenu } from 'src/app/models/Menu';
import { PriceList } from '../../models/inventory.model';
import { InventarioService } from '../../services/inventario.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ConfirmDialogService } from 'src/app/components/confirm-dialog/service/confirmDialog.service';
import { Columns } from 'src/app/interfaces/ConfigsFormsData.interface';
import { DynamicModalComponent } from 'src/app/components/dynamic-modal/dynamic-modal.component';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.scss']
})
export class PriceListComponent extends GeneralMenu implements OnInit {

  @ViewChild('table_price_list') table_price_list!: DynamicModalComponent
  price_list: PriceList = new PriceList()
  columns_price_list: Columns[] = []
  array_price_list: PriceList[] = []

  constructor(
    private confirmDialogService: ConfirmDialogService,
    private toastService: ToastService,
    private inventarioService: InventarioService,
    authService: AuthService) {
    super(authService, Modules.lista_de_precios)
  }

  ngOnInit(): void {
    this.columns_price_list = this.inventarioService.columns_price_list
  }
  openModalPriceList() {
    this.table_price_list.openAndCloseModal()
  }
  discardForm() {
    this.price_list = new PriceList()
  }
  /**
   *Crea una lista de precios
   *
   * @memberof PriceListComponent
   */
  createPriceList() {

    if (!this.validatePriceList()) return

    this.loading = true
    this.inventarioService.createPriceList(this.price_list).subscribe({
      next: (data) => {
        this.array_price_list.push(this.price_list)
        this.loading = false
        this.toastService.success('Lista de precios guardada exitosamente')
      },
      error: (err) => {
        this.loading = false
        this.toastService.error('Error al guardar lista de precios')
      },
    })
  }
  /**
   *Valida el formulario
   *
   * @return {*}  {Boolean}
   * @memberof PriceListComponent
   */
  validatePriceList(): Boolean {
    let pass = true
    if (!this.price_list.name.trim()) {
      pass = false
      this.toastService.info('El nombre de la lista de precios es requerido')
    }
    return pass
  }
}
