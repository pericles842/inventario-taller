import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from 'src/app/components/loading/loading.component';
import { GeneralFormMenuComponent } from "../../components/general-form-menu/general-form-menu.component";
import { HeaderFormComponent } from "../../components/header-form/header-form.component";
import { StoreRoutes } from './almacen.routing';
import { AlmacenCrudComponent } from './pages/almacen-crud/almacen-crud.component';
import { InputFormsComponent } from "../../components/input-forms/input-forms.component";
import { FormsModule } from '@angular/forms';
import { SequencePipe } from 'src/app/pipes/sequence.pipe';
import { AddPrefixDirective } from 'src/app/directives/add-prefix.directive';






@NgModule({
    declarations: [
        AlmacenCrudComponent,
        SequencePipe,
        AddPrefixDirective
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
    ]
})
export class AlmacenesModule { }
