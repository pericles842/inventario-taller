import { Component, OnInit } from '@angular/core';
import * as toast from 'toastr';
import { AuthService } from '../../../../components/login/services/Auth.service';
import { RolUser } from '../../models/Status.Interface';
import { Usuario } from '../../models/UsuariosModel';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-usuarios-form',
  templateUrl: './usuarios-form.component.html',
  styleUrls: ['./usuarios-form.component.scss']
})
export class UsuariosFormComponent implements OnInit {

  //Roles
  listRoles: RolUser[] = []

  protected userAuthenticated: Usuario = this.authService.getUser()

  userForm: Usuario = new Usuario()

  constructor(
    private usuariosService: UsuariosService,
    private authService: AuthService

  ) { }
  ngOnInit(): void {
    this.callServiceListStatus()

  }
  saveElement() {
    this.userForm.rol=  parseInt(this.userForm.rol as  unknown as string)
   this.callCreateUser(this.userForm) 
  }
  /**
   *crea un usuario 
   *
   * @param {Usuario} usuario
   * @memberof UsuariosFormComponent
   */
  callCreateUser(usuario:Usuario){
    this.usuariosService.createUser(usuario).subscribe({
      next: (usuario) => {
        toast.success('Usuario creado exitosamente ')
      },
      error(err) {

        console.log(err);

        toast.error(err.message);
      }
    })
  }
  /**
   *Ejecuta el servicio para listar los roles
   *
   * @memberof UsuariosFormComponent
   */
  callServiceListStatus() {
   // console.log(this.userAuthenticated.rol);

    this.usuariosService.listStatus(this.userAuthenticated.rol).subscribe({
      next: (listRoles) => {
        this.listRoles = listRoles
      },
      error(err) {

        console.log(err);

        toast.error('Los datos no coinciden');
      }
    })
  }
  /**
   *Decta el cambio del check
   *
   * @memberof UsuariosFormComponent
   */
  changeUsername() {

    //si ci esta vacio
    if (this.userForm.ci_as_username && this.userForm.ci.toString().trim() == '') {
      this.userForm.ci_as_username = false;
      toast.warning('LLene el campo cédula')
    }

    if (this.userForm.ci_as_username) {
      this.userForm.username = this.userForm.ci.toString()
    } else this.userForm.username = ''

  }
}
