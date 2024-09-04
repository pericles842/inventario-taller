import { Component, OnInit, ViewChild } from '@angular/core';
import { DynamicTableComponent } from 'src/app/components/dynamic-table/dynamic-table.component';
import { Modules } from 'src/app/enum/Modules';
import { Columns } from 'src/app/interfaces/ConfigsFormsData.interface';
import { GeneralMenu } from 'src/app/models/Menu';
import { ToastService } from 'src/app/services/toast/toast.service';
import { AuthService } from '../../../../components/login/services/Auth.service';
import { RolUser } from '../../models/Status.Interface';
import { Usuario } from '../../models/UsuariosModel';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-usuarios-form',
  templateUrl: './usuarios-form.component.html',
  styleUrls: ['./usuarios-form.component.scss']
})
export class UsuariosFormComponent extends GeneralMenu implements OnInit {

  @ViewChild('table') table !: DynamicTableComponent

  type_view: number = 0
  columns: Columns[] = [];
  listRoles: RolUser[] = [];
  userForm: Usuario = new Usuario();
  listUsers: Usuario[] = [];

  constructor(
    private usuariosService: UsuariosService,
    private toastService: ToastService,
    authService: AuthService

  ) { super(authService, Modules.usuarios) }
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

      this.toastService.warning('El campo Nombre debe estar lleno')
      pass = false
    } else if (!this.userForm.email.trim()) {

      this.toastService.warning('El campo Email debe estar lleno')
      pass = false
    } else if (!this.userForm.username.trim()) {

      this.toastService.warning('El campo Username debe estar lleno')
      pass = false
    } else if (!this.userForm.password.trim()) {

      this.toastService.warning('El campo Contraseña debe estar lleno')
      pass = false
    } else if (!this.userForm.ci.toString().trim()) {

      this.toastService.warning('El campo Cédula debe estar lleno')
      pass = false
    } else if (this.userForm.repeat_password.trim() != this.userForm.password.trim()) {

      this.toastService.warning('Las confirmación de contraseña no coincide')
      pass = false
    } else if (!this.userForm.repeat_password.trim()) {

      this.toastService.warning('Por favor confirme la contraseña')
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

        } else {

          let index = this.listUsers.findIndex(u => u.id == this.userForm.id)

          this.listUsers[index] = this.userForm
        }
        this.presentation()
        this.loading = false
        setTimeout(() => { this.toastService.success('Usuario guardado exitosamente ') }, 200);
      },
      error: (err) => {
        this.loading = false
        this.toastService.error(err.message);
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
        this.toastService.error('Problema al cargar los roles');
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
      this.toastService.warning('LLene el campo cédula')
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
        this.toastService.error('Error al listar usuarios')
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
    this.totalMenu()
  }

  /**
   *Descarta el formulario
   *
   * @memberof UsuariosFormComponent
   */
  descartar() {
    this.userForm = new Usuario()
    this.presentation()
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

        this.toastService.success('Usuario eliminado')
        this.presentation()
      },
      error: (err) => {
        this.toastService.error('Error al eliminar usuario')
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
        this.toastService.success('Usuario archivado exitosamente')
      },
      error: (err) => {
        this.toastService.success('Error al archivar usuario')
      },
    })
  }
  refreshModel() {
    this.userForm = new Usuario()
  }
}
