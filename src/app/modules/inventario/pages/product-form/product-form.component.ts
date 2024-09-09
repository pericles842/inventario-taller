import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/components/login/services/Auth.service';
import { Modules } from 'src/app/enum/Modules';
import { GeneralMenu } from 'src/app/models/Menu';
import { Product } from '../../models/Product.model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent extends GeneralMenu implements OnInit {

  product: Product = new Product()

  constructor(authService: AuthService) {
    super(authService, Modules.productos)
  }

  ngOnInit(): void { }
}
