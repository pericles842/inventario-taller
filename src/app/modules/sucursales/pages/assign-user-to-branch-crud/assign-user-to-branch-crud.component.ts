import { Component, OnInit, ViewChild } from '@angular/core';
import { DynamicTableComponent } from 'src/app/components/dynamic-table/dynamic-table.component';
import { Columns } from 'src/app/interfaces/ConfigsFormsData.interface';
import { ToastService } from 'src/app/services/toast/toast.service';
import { oneFirsUppercase } from '../../../../functions/Words';
import { Sucursal, typeBranch } from '../../models/Sucursal.Model';
import { BranchesService } from '../../service/sucursales.service';
import { BodyBranch } from '../../models/bodyBranch';

@Component({
  selector: 'app-assign-user-to-branch-crud',
  templateUrl: './assign-user-to-branch-crud.component.html',
  styleUrls: ['./assign-user-to-branch-crud.component.scss']
})
export class AssignUserToBranchCrudComponent implements OnInit {
  type_view: number = 0
  loading: boolean = false
  loadingSelectBranch: boolean = false

  //columnas de tablas
  columns_branch_not_users: Columns[] = []
  columns_branch_users: Columns[] = []

  /**
   *lista de usuarios no asignados
   *
   * @type {Sucursal[]}
   * @memberof AssignUserToBranchCrudComponent
   */
  listUserNotBranch: Sucursal[] = []
  /**
   *Lista de sucursales
   *
   * @type {any[]}
   * @memberof AssignUserToBranchCrudComponent
   */
  listBranch: any[] = []
  idBranch: number = -1
  /**
   *Listado de usuarios de la sucursal
   *
   * @type {Sucursal[]}
   * @memberof AssignUserToBranchCrudComponent
   */
  listUserBranch: Sucursal[] = []
  /**
   *Copia listUserBranch
   *
   * @type {any[]}
   * @memberof AssignUserToBranchCrudComponent
   */
  copyUserBranch: any[] = []

  typeBranch: typeBranch['typeBranch'] | null = null
  /**
   *Cabecera del formulario
   *
   * @type {Sucursal}
   * @memberof AssignUserToBranchCrudComponent
   */
  sucursal: Sucursal = new Sucursal()

  @ViewChild('table_users') table_users!: DynamicTableComponent

  constructor(
    private branchesService: BranchesService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {

    // Mostrar la notificación con la configuración personalizada

    this.columns_branch_not_users = this.branchesService.columns_branch_not_users
    this.columns_branch_users = this.branchesService.columns_branch_users

    this.listAllBranch()
  }

  get branch() {
    let filterBranch = this.listBranch.filter(branch => branch.type === this.typeBranch);
    return filterBranch;

  }
  /**
   *Lista los usuarios para asignar a un sucursal
   *
   * @memberof AssignUserToBranchCrudComponent
   */
  listUsersNotBranch() {
    this.loading = true
    this.branchesService.listUsersNotBranch().subscribe({
      next: (users) => {

        this.listUserNotBranch = users
        this.loading = false
      },
      error: (err) => {
        this.loading = false
        this.toastService.error('error al listar usuarios', 'Error')
      },
    })
  }
  /**
   *Mensaje de select
   *
   * @memberof AssignUserToBranchCrudComponent
   */
  msgSelect() {
    if (this.typeBranch == null) this.toastService.info('Seleccione una Tienda o un almacén', 'No existen datos')
  }
  /**
   *Listar sucursales
   *
   * @memberof AssignUserToBranchCrudComponent
   */
  listAllBranch() {
    this.loading = true
    this.branchesService.listAllBranch().subscribe({
      next: (branch) => {
        this.listBranch = branch
        this.loading = false
      },
      error: (err) => {
        this.loading = false
        this.toastService.error('Error al cargar las sucursales', 'Error')
      },
    })
  }
  /**
   *Lisa los usuarios de una sucursal
   *
   * @param {typeBranch["typeBranch"]} type_branch
   * @param {number} id_branch
   * @memberof AssignUserToBranchCrudComponent
   */
  listBranchUsers(type_branch: typeBranch["typeBranch"], id_branch: number) {
    this.loading = true

    this.branchesService.listBranchUsers(type_branch, id_branch).subscribe({
      next: (users) => {
        this.sucursal.sucursal_id = this.idBranch
        this.sucursal.direction = this.listBranch.find(branch => branch.id == this.idBranch && branch.type == this.typeBranch).direction

        this.listUserBranch = users;
        this.copyUserBranch = users.slice();

        this.loading = false
      },
      error: (err) => {
        this.loading = false
        this.toastService.error('Error al cargar usuarios de la sucursal')
      },
    })
  }
  /**
   *Realiza el procedimiento para cambiar una sucursal
   *
   * @memberof AssignUserToBranchCrudComponent
   */
  async changeBranch(select: boolean = false) {

    let id_branch = this.idBranch;

    if (select) {
      //para el select una promesa debido al valor computado branch
      id_branch = await new Promise<number>((resolve, reject) => {
        this.loadingSelectBranch = true
        setTimeout(() => {

          let branch = this.branch
          this.idBranch = branch[0]?.id

          resolve(this.idBranch)
          this.loadingSelectBranch = false

        }, 200);

      })
    }

    this.listBranchUsers(this.typeBranch as 'almacen' | 'tienda', id_branch);
    this.listUsersNotBranch()
  }

  /**
   *Abre el modal de lista no despachadas 
   *
   * @memberof AssignUserToBranchCrudComponent
   */
  openModalListNotBranch() {
    this.table_users.openAndCloseModal()
  }

  /**
   *Se encarga de  hacer el cambio de una tabla a la otra
   *
   * @param {(Sucursal[] | Sucursal)} items
   * @param {boolean} [addInBranchNotUser=false]
   * @memberof AssignUserToBranchCrudComponent
   */
  assignArrayUsersToBranch(items: Sucursal[] | Sucursal, addInBranchNotUser: boolean = false) {

    const Sucursales = Array.isArray(items) ? items : [items]



    //valida que no se repitan las sucursales
    if (!this.validateManagers(Sucursales, addInBranchNotUser)) return

    Sucursales.forEach(item => {

      let index_user_not_branch = this.listUserNotBranch.findIndex(i => i.user_id == item.user_id)
      let index_user = this.listUserBranch.findIndex(i => i.user_id == item.user_id)

      if (addInBranchNotUser) {

        this.listUserNotBranch.splice(index_user_not_branch, 1)
        this.listUserBranch.push(item)
      } else {

        this.listUserBranch.splice(index_user, 1)
        this.listUserNotBranch.push(item)
      }
      item.check = false
    })

  }
  /**
   *Valida los usuarios que estan ingresando a los arreglos
   *
   * @param {Sucursal[]} users
   * @return {*}  {boolean}
   * @memberof AssignUserToBranchCrudComponent
   */
  validateManagers(users: Sucursal[], addInBranchNotUser: boolean): boolean {
    let pass = true

    if (!addInBranchNotUser) return true

    //rol el cual se va a manejar
    const ROL = this.typeBranch == 'almacen' ? 3 : 4

    let managerFilter: Sucursal[] = []

    if (!this.noMixManagers(users)) return false;

    managerFilter = users.filter(user => user.rol_id == ROL)
    let managerBranchFilter = this.listUserBranch.filter(user => user.rol_id == ROL)

    if (managerFilter.length > 1) {


      this.toastService.warning(`No se puede tener mas de ${managerFilter.length - 1} ${managerFilter[0].cargo} en la sucursal`)
      return false
    }


    if (managerBranchFilter.length > 0 && managerFilter.length > 0) {

      this.toastService.warning(`Esta sucursal ya tiene asignado un ${managerBranchFilter[0].cargo}`)
      return false
    }


    return pass
  }

  /**
   *Evita mezclar gerentes de tienda a almacén y diversa
   *
   * @param {Sucursal[]} users
   * @return {*}  {Boolean}
   * @memberof AssignUserToBranchCrudComponent
   */
  noMixManagers(users: Sucursal[]): Boolean {

    let pass = true
    let nonBelongingUser: boolean =
      users.some(user => (this.typeBranch == 'almacen' && user.rol_id == 4) || (this.typeBranch == 'tienda' && user.rol_id == 3))

    if (nonBelongingUser) {
      this.toastService.warning(`No se permite asignar un <b> gerente de <b>
       ${this.typeBranch == 'almacen' ? ' <b> tienda <b> , a un' : '<b> almacén </b> , a una'} ${oneFirsUppercase(this.typeBranch as any)}`)
      pass = false
    }

    return pass
  }
  /**
   *Guarda el documento completo
   *
   * @memberof AssignUserToBranchCrudComponent
   */
  saveElement() {

    let body: BodyBranch = {
      id_branch: this.idBranch,
      type_branch: this.typeBranch as typeBranch['typeBranch'],
      ids_users: [],
      ids_users_delete: []
    }

    this.copyUserBranch.filter(user => {
      if (!this.listUserBranch.includes(user)) {
        body.ids_users_delete.push(user.user_id)
      }
    });

    this.listUserBranch.forEach(users => {
      body.ids_users.push(users.user_id)
    })

    if (!this.validateBodyBranch(body)) return
    this.loading = true
    this.branchesService.assignUsersBranch(body).subscribe({
      next: (value) => {
        this.loading = false
        this.toastService.success('Guardado con exito')
      }, error: (err) => {
        this.loading = false
        this.toastService.error('Error al asignar usuarios')
      },
    })
  }

  /**
   *Valida la carga antes de guardar
   *
   * @param {BodyBranch} body
   * @return {*}  {Boolean}
   * @memberof AssignUserToBranchCrudComponent
   */
  validateBodyBranch(body: BodyBranch): Boolean {
    let pass = true

    if (body.type_branch == null) {
      this.toastService.info('Seleccionar una sucursal')
      return false
    }

    return pass
  }
}
