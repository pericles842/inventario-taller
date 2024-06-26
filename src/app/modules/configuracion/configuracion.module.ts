import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DynamicTableComponent } from "../../components/dynamic-table/dynamic-table.component";
import { GeneralFormMenuComponent } from "../../components/general-form-menu/general-form-menu.component";
import { HeaderFormComponent } from "../../components/header-form/header-form.component";
import { InputFormsComponent } from "../../components/input-forms/input-forms.component";
import { LoadingComponent } from "../../components/loading/loading.component";
import { UsuariosFormComponent } from './components/usuarios-form/usuarios-form.component';
import { ConfigRoutes } from './configuracion.routing';
import { MonedasCrudComponent } from './pages/monedas-crud/monedas-crud/monedas-crud.component';
import { DynamicModalComponent } from "../../components/dynamic-modal/dynamic-modal.component";
import { TasasComponent } from "../../components/tasas/tasas.component";
import { SequencePipe } from 'src/app/pipes/sequence.pipe';
import { PipesModule } from 'src/app/pipes/pipes.module';




@NgModule({
    declarations: [
        UsuariosFormComponent,
        MonedasCrudComponent
    ],
    imports: [
        PipesModule,
        CommonModule,
        FormsModule,
        GeneralFormMenuComponent,
        RouterModule.forChild(ConfigRoutes),
        HeaderFormComponent,
        InputFormsComponent,
        HttpClientModule,
        LoadingComponent,
        DynamicTableComponent,
        DynamicModalComponent,
        TasasComponent
    ]
})
export class ConfigurationModule { }
