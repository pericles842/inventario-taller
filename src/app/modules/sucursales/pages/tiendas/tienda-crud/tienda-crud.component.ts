import { Component, OnInit, ViewChild } from '@angular/core';
import { DynamicTableComponent } from 'src/app/components/dynamic-table/dynamic-table.component';
import * as toast from 'toastr';
import { Shop } from '../../../models/Tienda.Model';
import { ShopService } from '../../../service/tiendas.service';
import { Columns } from 'src/app/interfaces/ConfigsFormsData.interface';

@Component({
  selector: 'app-tienda-crud',
  templateUrl: './tienda-crud.component.html',
  styleUrls: ['./tienda-crud.component.scss']
})
export class TiendaCrudComponent implements OnInit {

  @ViewChild('table') table!: DynamicTableComponent

  loading: boolean = false
  type_view: number = 0
  shop: Shop = new Shop()
  listShops: Shop[] = []
  columns: Columns[] = []

  constructor(
    private shopService: ShopService
  ) { }

  ngOnInit(): void {
    this.columns = this.shopService.columns_shop
  }
  /**
   *Guardar dinamicamente una  tienda
   *
   * @memberof TiendaCrudComponent
   */
  saveElement() {
    if (!this.validationForm()) return

    this.loading = true;
    this.shopService.createShop(this.shop).subscribe({
      next: (shop) => {
        
        if (this.shop.id == -1) {

          this.shop.id = shop.id
          this.listShops.push(this.shop)
        } else {
          let index = this.listShops.findIndex(s => s.id = shop.id)
          this.listShops[index] = this.shop
        }

        this.loading = false;
        this.type_view = 1


        toast.success('Guardado exitosamente')
      },
      error: (err) => {
        toast.error('Error al guardar tienda')
      },
    })
  }
  /**
   *Valida el formulario
   *
   * @return {*}  {boolean}
   * @memberof TiendaCrudComponent
   */
  validationForm(): boolean {
    let pass = true

    if (!this.shop.name_shop.trim()) {
      pass = false
      toast.warning('Asignar nombre para la tienda');

    } else if (!this.shop.direction.trim()) {
      pass = false
      toast.warning('Asignar dirección de la tienda');
    }

    return pass
  }
  /**
   *Llama al listado de tiendas
   *
   * @memberof TiendaCrudComponent
   */
  search() {
    this.listShopsService()

  }
  /**
   *Listar tiendas
   *
   * @memberof TiendaCrudComponent
   */
  listShopsService() {
    this.loading = true
    this.shopService.listShop().subscribe({
      next: (shops) => {
        this.listShops = shops
        this.table.openAndCloseModal()
        this.loading = false
      },
      error: (err) => {
        this.loading = false
        toast.error('Error al cargar tiendas')
      },
    })
  }

  /**
   *Descarta el formulario
   *
   * @memberof TiendaCrudComponent
   */
  descartar() {
    this.shop = new Shop()
    this.type_view = 0
  }

  /**
   *Selecciona un item de la tabla
   *
   * @param {Shop} shop
   * @memberof TiendaCrudComponent
   */
  selectItem(shop: Shop) {
    this.shop = shop
    this.type_view  =1 
    this.table.openAndCloseModal()
  }
  /**
   *Elimina una tienda
   *
   * @memberof TiendaCrudComponent
   */
  delete() {
    this.loading = true
    this.shopService.deleteShop(this.shop.id).subscribe({
      next: (value) => {

        let index = this.listShops.findIndex(al => al.id == this.shop.id);
        this.listShops.splice(index, 1);
        this.shop = new Shop()

        this.loading = false
        toast.success('Tienda eliminada exitosamente')
      },
      error: (err) => {

        this.loading = false
        toast.error('Error al eliminar un tienda')
      },
    })
  }
  /**
   *Cerrar una tienda
   *
   * @memberof TiendaCrudComponent
   */
  closeShop() {
    this.loading = true
    this.shopService.closeShop(this.shop.id).subscribe({
      next: (value) => {
        this.descartar()
        this.loading = false
        toast.success('Error al eliminar un tienda')
      },
      error: (err) => {
        toast.error('Error al cerrar un tienda')
        this.loading = false
      },
    })
  }
}
