import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from 'src/app/components/loading/loading.component';
import { AddPrefixDirective } from 'src/app/directives/add-prefix.directive';
import { SequencePipe } from 'src/app/pipes/sequence.pipe';
import { DynamicTableComponent } from "../../components/dynamic-table/dynamic-table.component";
import { GeneralFormMenuComponent } from "../../components/general-form-menu/general-form-menu.component";
import { HeaderFormComponent } from "../../components/header-form/header-form.component";
import { InputFormsComponent } from "../../components/input-forms/input-forms.component";
import { AlmacenCrudComponent } from './pages/almacenes/almacen-crud/almacen-crud.component';
import { AssignUserToBranchCrudComponent } from './pages/assign-user-to-branch-crud/assign-user-to-branch-crud.component';
import { TiendaCrudComponent } from './pages/tiendas/tienda-crud/tienda-crud.component';
import { BranchRoutes } from './sucursales.routing';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { DirectiveModule } from 'src/app/directives/directive.module';

@NgModule({
    declarations: [
        AlmacenCrudComponent,
        AddPrefixDirective,
        TiendaCrudComponent,
        AssignUserToBranchCrudComponent
    ],
    imports: [
        PipesModule,
        FormsModule,
        CommonModule,
        GeneralFormMenuComponent,
        RouterModule.forChild(BranchRoutes),
        HttpClientModule,
        LoadingComponent,
        HeaderFormComponent,
        InputFormsComponent,
        DynamicTableComponent,
        DirectiveModule
    ]
})
export class AlmacenesModule { }
