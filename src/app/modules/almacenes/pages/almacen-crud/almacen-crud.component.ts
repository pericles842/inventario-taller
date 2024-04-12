import { Component } from '@angular/core';
import * as toast from 'toastr';
import { Store } from '../../models/AlmacenModel';
import { StoreService } from '../../service/almacenes.service';


@Component({
  selector: 'app-almacen-crud',
  templateUrl: './almacen-crud.component.html',
  styleUrls: ['./almacen-crud.component.scss']
})
export class AlmacenCrudComponent {
  store: Store = new Store()
  loading: boolean = false
  type_view: number = 0
  listStores: Store[] = []


  constructor(
    private storeService: StoreService
  ) { }
 
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
        this.type_view =1
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
}
