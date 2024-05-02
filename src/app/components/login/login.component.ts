import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/modules/usuarios/models/UsuariosModel';
import * as toast from 'toastr';
import { InputFormsComponent } from "../input-forms/input-forms.component";
import { AuthService } from './services/Auth.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { LoadingComponent } from "../loading/loading.component";

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
        LoadingComponent
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
    private router: Router,
    private toastService:ToastService
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
    if (!this.validateLogin()) return this.toastService.info('Campos no validos')
    this.loading = true

    this.authService.login(this.usuario).subscribe({
      next: (user) => {
        let usuario = user[0];
        
        // Guardar las credenciales y establecer el usuario autenticado
        this.saveCredentials();
        this.authService.setAuthenticated();
        this.authService.setUser(usuario);
        
        // Navegar al dashboard después de la autenticación
        this.router.navigate(['/dashboard']);
  
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        
        this.toastService.error('Credenciales inválidas')

      }
    });
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
