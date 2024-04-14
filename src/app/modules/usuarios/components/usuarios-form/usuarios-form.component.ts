import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as toast from 'toastr';
import { AuthService } from '../../../../components/login/services/Auth.service';
import { RolUser } from '../../models/Status.Interface';
import { Usuario } from '../../models/UsuariosModel';
import { UsuariosService } from '../../services/usuarios.service';
import { Columns } from 'src/app/interfaces/ConfigsFormsData.interface';
import { DynamicTableComponent } from 'src/app/components/dynamic-table/dynamic-table.component';
import { findIndex } from 'rxjs';

@Component({
  selector: 'app-usuarios-form',
  templateUrl: './usuarios-form.component.html',
  styleUrls: ['./usuarios-form.component.scss']
})
export class UsuariosFormComponent implements OnInit {

  @ViewChild('table') table !: DynamicTableComponent

  type_view: number = 0
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

    //valida el formulario
    if (!this.validateForm()) return

    this.callCreateUser(this.userForm)
  }

  /**
   *Valida el formulario
   *
   * @return {*} 
   * @memberof UsuariosFormComponent
   */
  validateForm() {
    let pass: boolean = true

    if (!this.userForm.name_user.trim()) {

      toast.warning('El campo Nombre debe estar lleno')
      pass = false
    } else if (!this.userForm.email.trim()) {

      toast.warning('El campo Email debe estar lleno')
      pass = false
    } else if (!this.userForm.username.trim()) {

      toast.warning('El campo Username debe estar lleno')
      pass = false
    } else if (!this.userForm.password.trim()) {

      toast.warning('El campo Contraseña debe estar lleno')
      pass = false
    } else if (!this.userForm.ci.toString().trim()) {

      toast.warning('El campo Cédula debe estar lleno')
      pass = false
    } else if (this.userForm.repeat_password.trim() != this.userForm.password.trim()) {

      toast.warning('Las confirmación de contraseña no coincide')
      pass = false
    } else if (!this.userForm.repeat_password.trim()) {

      toast.warning('Por favor confirme la contraseña')
      pass = false
    }

    return pass;
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

        if (this.userForm.id == -1) {

          this.userForm.id = usuario.id
          let name_rol = this.listRoles.find(rol => rol.id == this.userForm.rol)?.name

          this.userForm.name_rol = name_rol as string
          this.listUsers.push(this.userForm)

          this.userForm = new Usuario();

        } else {

          let index = this.listUsers.findIndex(u => u.id == this.userForm.id)

          this.listUsers[index] = this.userForm
        }

        this.loading = false
        setTimeout(() => { toast.success('Usuario guardado exitosamente ') }, 200);
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
    this.listarUsuarios()
    this.table.openAndCloseModal();
  }
  /**
   *Llama al servicio de listar usuarios
   *
   * @memberof UsuariosFormComponent
   */
  listarUsuarios() {
    this.usuariosService.searchUser().subscribe({
      next: (usuario) => {
        this.listUsers = usuario

      },
      error: (e) => {

        toast.error('Error al listar usuarios')
      }
    })
  }
  /**
   *Setea los valores de la tabla al modelo ngmdel
   *
   * @param {Usuario} event 
   * @memberof UsuariosFormComponent
   */
  selectItem(event: Usuario) {
    this.userForm = event
    this.userForm.repeat_password = event.password;
    this.table.openAndCloseModal()
    this.type_view = 1
  }

  /**
   *Descarta el formulario
   *
   * @memberof UsuariosFormComponent
   */
  descartar() {
    this.userForm = new Usuario()
    this.type_view = 0
  }
  /**
   *Elimina un usuario
   *
   * @param {number} id
   * @memberof UsuariosFormComponent
   */
  deleteUser() {
    let id: number = this.userForm.id

    this.usuariosService.deleteUser(id).subscribe({
      next: (value) => {

        //buscamos el indice para eliminarlo 
        let index = this.listUsers.findIndex(u => u.id == id);
        this.listUsers.splice(index, 1);
        this.userForm = new Usuario()

        toast.warning('Usuario eliminado')
      },
      error: (err) => {
        toast.error('Error al listar usuarios')
      },
    })
  }
  /**
   *archiva un unario
   *
   * @memberof UsuariosFormComponent
   */
  archiveUser() {
    this.usuariosService.archiveUser(this.userForm.id).subscribe({
      next: (value) => {
        this.descartar()
        toast.success('Usuario archivado exitosamente')
      },
      error: (err) => {
        toast.success('Error al archivar usuario')
      },
    })
  }
}
