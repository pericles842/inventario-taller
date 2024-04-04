import { Component, OnInit } from '@angular/core';
import { InputFormsComponent } from "../input-forms/input-forms.component";
import { HttpClientModule } from '@angular/common/http';
import { Usuario } from 'src/app/modules/usuarios/models/UsuariosModel';
import { AuthService } from './services/service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as toast from 'toastr';
import {  Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    InputFormsComponent,
    HttpClientModule,
    CommonModule, 
    FormsModule
  ]
})
export class LoginComponent implements OnInit  {
  /**
   *Usuario
   *
   * @type {Usuario}
   * @memberof LoginComponent
   */
  usuario: Usuario = new Usuario();

  /**
   *recordar contrasena
   *
   * @type {boolean}
   * @memberof LoginComponent
   */
  recordarPassword: boolean = false
  toast = toast;

  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('session_user')) {
      let user = JSON.parse(localStorage.getItem('session_user') as string);

      this.usuario.password = user.password
      this.usuario.username = user.username
      this.recordarPassword = true;
    }
  }
  /**
   *Ejecuta el servicio de autenticación
   *
   * @memberof LoginComponent
   */
  callServiceAutenticarLogin(): any {
    if (!this.validateLogin()) return toast.info('Campos no validos')
    this.loading = true

    this.authService.login(this.usuario).subscribe({
      next: (user) => {
        
        let usuario = user[0];
        sessionStorage.setItem('user', JSON.stringify(usuario));

        this.saveCredentials();
        this.authService.setAuthenticated()
        this.router.navigate(['/dashboard'])

        this.authService.setUser(usuario)
        this.loading = false

      },
      error: (err) => {
        this.loading = false
        toast.error('Los datos no coinciden');

      },
    })

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

  /**
   *Guarda las credenciales
   *
   * @memberof LoginComponent
   */
  saveCredentials() {

    if (this.recordarPassword) {
      localStorage.setItem('session_user', JSON.stringify({ username: this.usuario.username, password: this.usuario.password }))
    } else {
      localStorage.removeItem("session_user");
    }

  }
  
}
