import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from 'src/app/components/loading/loading.component';
import { GeneralFormMenuComponent } from "../../components/general-form-menu/general-form-menu.component";
import { HeaderFormComponent } from "../../components/header-form/header-form.component";
import { StoreRoutes } from './sucursales.routing';
import { AlmacenCrudComponent } from './pages/almacenes/almacen-crud/almacen-crud.component';
import { InputFormsComponent } from "../../components/input-forms/input-forms.component";
import { FormsModule } from '@angular/forms';
import { SequencePipe } from 'src/app/pipes/sequence.pipe';
import { AddPrefixDirective } from 'src/app/directives/add-prefix.directive';
import { DynamicTableComponent } from "../../components/dynamic-table/dynamic-table.component";
import { TiendaCrudComponent } from './pages/tiendas/tienda-crud/tienda-crud.component';






@NgModule({
    declarations: [
        AlmacenCrudComponent,
        SequencePipe,
        AddPrefixDirective,
        TiendaCrudComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        GeneralFormMenuComponent,
        RouterModule.forChild(StoreRoutes),
        HttpClientModule,
        LoadingComponent,
        HeaderFormComponent,
        InputFormsComponent,
        DynamicTableComponent
    ]
})
export class AlmacenesModule { }
