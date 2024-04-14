import { Component } from '@angular/core';
import { Shop } from '../../../models/Tienda.Model';

@Component({
  selector: 'app-tienda-crud',
  templateUrl: './tienda-crud.component.html',
  styleUrls: ['./tienda-crud.component.scss']
})
export class TiendaCrudComponent {

  loading: boolean = false
  type_view: number = 0
  shop: Shop = new Shop()
}
