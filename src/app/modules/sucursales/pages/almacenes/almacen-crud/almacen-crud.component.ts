import { Component, OnInit, ViewChild } from '@angular/core';
import { DynamicTableComponent } from 'src/app/components/dynamic-table/dynamic-table.component';
import { AuthService } from 'src/app/components/login/services/Auth.service';
import { Modules } from 'src/app/enum/Modules';
import { Columns } from 'src/app/interfaces/ConfigsFormsData.interface';
import { GeneralMenu } from 'src/app/models/Menu';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Store } from '../../../models/AlmacenModel';
import { StoreService } from '../../../service/almacenes.service';


@Component({
  selector: 'app-almacen-crud',
  templateUrl: './almacen-crud.component.html',
  styleUrls: ['./almacen-crud.component.scss']
})
export class AlmacenCrudComponent extends GeneralMenu implements OnInit {
  @ViewChild('table') table!: DynamicTableComponent

  store: Store = new Store()
  listStores: Store[] = []
  columns: Columns[] = []


  constructor(
    private storeService: StoreService,
    private toastService: ToastService,
    authService: AuthService
  ) { super(authService, Modules.almacenes) }

  ngOnInit(): void {
    this.columns = this.storeService.columns_store
  }
  /**
   *Guarda un almacen
   *
   * @memberof AlmacenCrudComponent
   */
  saveElement() {

    if (!this.validationForm()) return
    this.loading = true;

    this.storeService.createStore(this.store).subscribe({
      next: (store) => {

        if (this.store.id == -1) {

          this.store.id = store.id
          this.listStores.push(this.store)
        } else {
          let index = this.listStores.findIndex(s => s.id = store.id)
          this.listStores[index] = this.store
        }

        this.loading = false;
        this.totalMenu()


        this.toastService.success('Guardado exitosamente')
      },
      error: (err) => {
        this.toastService.error('Hubo un problema al crear el almacén')
        this.loading = false;
      }
    })
  }
  /**
   *Validar formulario
   *
   * @return {*}  {boolean}
   * @memberof AlmacenCrudComponent
   */
  validationForm(): boolean {
    let pass = true

    if (!this.store.name_store.trim()) {
      pass = false
      this.toastService.warning('Asignar nombre para el almacén');

    } else if (!this.store.direction.trim()) {
      pass = false
      this.toastService.warning('Asignar dirección del almacén');
    }

    return pass
  }
  /**
   *Listar almacenes
   *
   * @memberof AlmacenCrudComponent
   */
  listStore() {
    this.loading = true
    this.storeService.listStore().subscribe({
      next: (stores) => {
        this.listStores = stores

        this.table.openAndCloseModal()
        this.loading = false
      },
      error: (err) => {
        this.loading = false
        this.toastService.error('Error al listar almacenes')
      },
    })
  }
  /**
   *buscar almacenes
   *
   * @memberof AlmacenCrudComponent
   */
  search() {
    this.listStore()
  }

  selectItem(event: Store) {
    this.store = event
    this.totalMenu()
    this.table.openAndCloseModal()
  }
  /**
   *Elimina un almacen
   *
   * @memberof AlmacenCrudComponent
   */
  deleteStore() {

    this.loading = true
    this.storeService.deleteStore(this.store.id).subscribe({
      next: (value) => {

        let index = this.listStores.findIndex(al => al.id == this.store.id);
        this.listStores.splice(index, 1);
        this.store = new Store()
        this.toastService.success('Almacen eliminado exitosamente')
        this.loading = false
        this.presentation()
      },
      error: (err) => {

        this.loading = false
        this.toastService.error('Error al eliminar un almacen')
      },
    })
  }
  /**
   *Descarta un formularios
   *
   * @memberof AlmacenCrudComponent
   */
  descartar() {
    this.store = new Store()
    this.presentation()
  }
  /**
   *Cierra un alamcen
   *
   * @memberof AlmacenCrudComponent
   */
  closeStore() {
    this.loading = false
    this.storeService.closeStore(this.store.id).subscribe({
      next: (store) => {
        this.descartar()
        this.loading = false
        this.toastService.success('Almacen cerrado exitosamente')
      },
      error: (err) => {
        this.loading = false
        this.toastService.error('Error al cerrar un almacen')
      },
    })
  }

  /**
   *Referencia al modelo de almacen
   *
   * @memberof AlmacenCrudComponent
   */
  refreshModel() {
    this.store = new Store()
  }
}
