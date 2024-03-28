import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosFormComponent } from './components/usuarios-form/usuarios-form.component';
import { GeneralFormMenuComponent } from "../../component/general-form-menu/general-form-menu.component";
import { RouterModule } from '@angular/router';
import { UsuariosRoutes } from './usuarios.routing';



@NgModule({
    declarations: [
        UsuariosFormComponent
    ],
    imports: [
        CommonModule,
        GeneralFormMenuComponent,
        RouterModule.forChild(UsuariosRoutes),
    ]
})
export class UsuariosModule { }
