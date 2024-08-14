import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CategoryComponent } from './components/category/category.component';
import { inventory } from './inventario.routing';
import { GeneralFormMenuComponent } from "../../components/general-form-menu/general-form-menu.component";



@NgModule({
  declarations: [
    CategoryComponent
  ],
  imports: [
    RouterModule.forChild(inventory),
    CommonModule,
    GeneralFormMenuComponent
]
})
export class InventarioModule { }
