import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DirectiveModule } from 'src/app/directives/directive.module';
import { DynamicModalComponent } from "../../components/dynamic-modal/dynamic-modal.component";
import { DynamicTableComponent } from "../../components/dynamic-table/dynamic-table.component";
import { GeneralFormMenuComponent } from "../../components/general-form-menu/general-form-menu.component";
import { HeaderFormComponent } from "../../components/header-form/header-form.component";
import { InputFormsComponent } from "../../components/input-forms/input-forms.component";
import { LoadingComponent } from "../../components/loading/loading.component";
import { TreeViewComponent } from "../../components/tree-view/tree-view.component";
import { PipesModule } from "../../pipes/pipes.module";
import { CategoryComponent } from './components/category/category.component';
import { inventory } from './inventario.routing';
import { PriceListComponent } from './pages/price-list/price-list.component';
import { ProductAttributesComponent } from './pages/product-attributes/product-attributes.component';
import { ProductFormComponent } from './pages/product-form/product-form.component';
import { PropertiesProductsFormComponent } from "./components/properties-products-form/properties-products-form.component";



@NgModule({
  declarations: [
    CategoryComponent,
    PriceListComponent,
    ProductFormComponent,
    ProductAttributesComponent
  ],
  imports: [
    RouterModule.forChild(inventory),
    CommonModule,
    DirectiveModule,
    FormsModule,
    GeneralFormMenuComponent,
    LoadingComponent,
    HeaderFormComponent,
    InputFormsComponent,
    PipesModule,
    DynamicTableComponent,
    TreeViewComponent,
    DynamicModalComponent,
    PropertiesProductsFormComponent
]
})
export class InventarioModule { }
