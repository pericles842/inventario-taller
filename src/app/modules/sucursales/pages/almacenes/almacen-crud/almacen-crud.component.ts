import { Component, OnInit, ViewChild } from '@angular/core';
import * as toast from 'toastr';
import { Store } from '../../../models/AlmacenModel';
import { StoreService } from '../../../service/almacenes.service';
import { Columns } from 'src/app/interfaces/ConfigsFormsData.interface';
import { DynamicTableComponent } from 'src/app/components/dynamic-table/dynamic-table.component';


@Component({
  selector: 'app-almacen-crud',
  templateUrl: './almacen-crud.component.html',
  styleUrls: ['./almacen-crud.component.scss']
})
export class AlmacenCrudComponent implements OnInit {
  @ViewChild('table') table!: DynamicTableComponent

  store: Store = new Store()
  loading: boolean = false
  type_view: number = 0
  listStores: Store[] = []
  columns: Columns[] = []


  constructor(
    private storeService: StoreService
  ) { }

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
        this.type_view = 1


        toast.success('Guardado exitosamente')
      },
      error: (err) => {
        toast.error('Hubo un problema al crear el almacén')
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
      toast.warning('Asignar nombre para el almacén');

    } else if (!this.store.direction.trim()) {
      pass = false
      toast.warning('Asignar dirección del almacén');
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
        toast.error('Error al listar almacenes')
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
    this.type_view = 1
    this.table.openAndCloseModal()
  }
  /**
   *Elimina un almacen
   *
   * @memberof AlmacenCrudComponent
   */
  delete() {
    this.loading = true
    this.storeService.deleteStore(this.store.id).subscribe({
      next: (value) => {

        let index = this.listStores.findIndex(al => al.id == this.store.id);
        this.listStores.splice(index, 1);
        this.store = new Store()

        this.loading = false
      },
      error: (err) => {

        this.loading = false
        toast.error('Error al eliminar un almacen')
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
        this.loading = false
        toast.success('Almacen cerrado')
      },
      error: (err) => {
        this.loading = false
        toast.error('Error al cerrar un almacen')
      },
    })
  }
}
