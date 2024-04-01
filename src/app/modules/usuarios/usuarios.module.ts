import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosFormComponent } from './components/usuarios-form/usuarios-form.component';
import { GeneralFormMenuComponent } from "../../components/general-form-menu/general-form-menu.component";
import { RouterModule } from '@angular/router';
import { UsuariosRoutes } from './usuarios.routing';
import { HeaderFormComponent } from "../../components/header-form/header-form.component";
import { InputFormsComponent } from "../../components/input-forms/input-forms.component";
import { FormsModule } from '@angular/forms';



@NgModule({
    declarations: [
        UsuariosFormComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        GeneralFormMenuComponent,
        RouterModule.forChild(UsuariosRoutes),
        HeaderFormComponent,
        InputFormsComponent
    ]
})
export class UsuariosModule { }
