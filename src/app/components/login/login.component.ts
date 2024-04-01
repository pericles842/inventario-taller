import { Component } from '@angular/core';
import { InputFormsComponent } from "../input-forms/input-forms.component";
import { HttpClientModule } from '@angular/common/http';
import { Usuario } from 'src/app/modules/usuarios/models/UsuariosModel';
import { LoginService } from './services/service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastComponent } from "../toast/toast.component";
import * as toastr from 'toastr';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    InputFormsComponent,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ToastComponent
  ]
})
export class LoginComponent {

  usuario: Usuario = new Usuario();

  constructor(
    private loginService: LoginService
  ) { }

  /**
   *Ejecuta el servicio de autenticación
   *
   * @memberof LoginComponent
   */
  callServiceAutenticarLogin() {

    if (this.validateLogin()) {
      this.loginService.login(this.usuario).subscribe({
        next: (user) => {
          sessionStorage.setItem('user', JSON.stringify(user[0]))

        },
        error: (err) => {
          console.log(err);

          toastr.error('Los datos no coinciden');

        },
      })


    } else toastr.info('Campos no validos');


  }
  /**
   *valida el login antes del click
   *
   * @memberof LoginComponent
   */
  validateLogin() {
    let pass = true
    if (!this.usuario.password.trim() || !this.usuario.username.trim()) {
      pass = false
    }
    return pass;
  }
}
