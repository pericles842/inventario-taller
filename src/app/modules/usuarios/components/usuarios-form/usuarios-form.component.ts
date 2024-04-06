import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as toast from 'toastr';
import { AuthService } from '../../../../components/login/services/Auth.service';
import { RolUser } from '../../models/Status.Interface';
import { Usuario } from '../../models/UsuariosModel';
import { UsuariosService } from '../../services/usuarios.service';
import { Columns } from 'src/app/interfaces/ConfigsFormsData.interface';
import { DynamicTableComponent } from 'src/app/components/dynamic-table/dynamic-table.component';

@Component({
  selector: 'app-usuarios-form',
  templateUrl: './usuarios-form.component.html',
  styleUrls: ['./usuarios-form.component.scss']
})
export class UsuariosFormComponent implements OnInit {

  @ViewChild('table') table !: DynamicTableComponent

  columns: Columns[] = [];
  listRoles: RolUser[] = [];
  userForm: Usuario = new Usuario();
  loading: boolean = false;
  listUsers: Usuario[] = [];

  constructor(
    private usuariosService: UsuariosService,

  ) { }
  ngOnInit(): void {
    this.callServiceListRoles()
    this.columns = this.usuariosService.columns

  }
  saveElement() {
    this.userForm.rol = parseInt(this.userForm.rol as unknown as string)
    this.callCreateUser(this.userForm)
  }
  /**
   *crea un usuario 
   *
   * @param {Usuario} usuario
   * @memberof UsuariosFormComponent
   */
  callCreateUser(usuario: Usuario) {
    this.loading = true

    this.usuariosService.createUser(usuario).subscribe({
      next: (usuario) => {
        this.userForm.id = usuario.id
        this.loading = false

        setTimeout(() => { toast.success('Usuario creado exitosamente ') }, 200);
      },
      error: (err) => {
        this.loading = false
        toast.error(err.message);
      }
    })
  }
  /**
   *Ejecuta el servicio para listar los roles
   *
   * @memberof UsuariosFormComponent
   */
  callServiceListRoles() {
    // console.log(this.userAuthenticated.rol);
    this.loading = true

    this.usuariosService.listRoles().subscribe({
      next: (listRoles) => {
        this.listRoles = listRoles
        this.loading = false
      },
      error: (err) => {
        this.loading = false
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
  /**
   *Servicio de búsqueda de usuarios
   *
   * @memberof UsuariosFormComponent
   */
  searchUser() {
    this.usuariosService.searchUser().subscribe({
      next: (usuario) => {
        this.listUsers = usuario
        this.table.openModal();

      },
      error: (e) => {
        toast.error(e)
      }
    })
  }
}
