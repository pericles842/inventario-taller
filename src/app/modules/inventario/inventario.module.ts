import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CategoryComponent } from './components/category/category.component';
import { inventory } from './inventario.routing';
import { GeneralFormMenuComponent } from "../../components/general-form-menu/general-form-menu.component";
import { LoadingComponent } from "../../components/loading/loading.component";
import { HeaderFormComponent } from "../../components/header-form/header-form.component";
import { InputFormsComponent } from "../../components/input-forms/input-forms.component";
import { FormsModule } from '@angular/forms';
import { PipesModule } from "../../pipes/pipes.module";
import { DynamicTableComponent } from "../../components/dynamic-table/dynamic-table.component";
import { TreeViewComponent } from "../../components/tree-view/tree-view.component";
import { DynamicModalComponent } from "../../components/dynamic-modal/dynamic-modal.component";
import { PriceListComponent } from './pages/price-list/price-list.component';
import { DirectiveModule } from 'src/app/directives/directive.module';



@NgModule({
  declarations: [
    CategoryComponent,
    PriceListComponent
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
    DynamicModalComponent
]
})
export class InventarioModule { }
