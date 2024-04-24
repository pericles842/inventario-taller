import { Component, OnInit, ViewChild } from '@angular/core';
import { Columns } from 'src/app/interfaces/ConfigsFormsData.interface';
import { BranchesService } from '../../service/sucursales.service';
import * as toast from 'toastr';
import { Sucursal, typeBranch } from '../../models/Sucursal.Model';
import { DynamicTableComponent } from 'src/app/components/dynamic-table/dynamic-table.component';

@Component({
  selector: 'app-assign-user-to-branch-crud',
  templateUrl: './assign-user-to-branch-crud.component.html',
  styleUrls: ['./assign-user-to-branch-crud.component.scss']
})
export class AssignUserToBranchCrudComponent implements OnInit {
  type_view: number = 0
  loading: boolean = false
  loadingSelectBranch: boolean = false

  columns_branch_not_users: Columns[] = []
  columns_branch_users: Columns[] = []

  listUserNotBranch: Sucursal[] = []
  listBranch: any[] = []
  idBranch: number = -1
  listUserBranch: Sucursal[] = []

  typeBranch: typeBranch['typeBranch'] | null = null
  sucursal: Sucursal = new Sucursal()

  @ViewChild('table_users') table_users!: DynamicTableComponent

  constructor(
    private branchesService: BranchesService
  ) { }

  ngOnInit(): void {
    this.columns_branch_not_users = this.branchesService.columns_branch_not_users
    this.columns_branch_users = this.branchesService.columns_branch_users

    this.listAllBranch()
    this.listUsersNotBranch()
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
        toast.error('error al listar usuarios ')
      },
    })
  }
  /**
   *Mensaje de select
   *
   * @memberof AssignUserToBranchCrudComponent
   */
  msgSelect() {
    if (this.typeBranch == null) toast.info('Seleccione una Tienda o un almacén')
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
        toast.error('Error al cargar las sucursales')
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

        this.listUserBranch = users
        this.loading = false
      },
      error: (err) => {
        this.loading = false
        toast.error('Error al cargar usuarios de la sucursal')
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
  }

  /**
   *Abre el modal de lista no despachadas 
   *
   * @memberof AssignUserToBranchCrudComponent
   */
  openModalListNotBranch() {
    this.table_users.openAndCloseModal()
  }


  assignArrayUsersToBranch(items: Sucursal[] | Sucursal, addInBranchNotUser: boolean = false) {

    const Sucursales = Array.isArray(items) ? items : [items]

    //valida que no se repitan las sucursales
    if (!this.notDuplicateManagers(Sucursales)) return

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
//!AREGLAR
  notDuplicateManagers(users: Sucursal[]): boolean {
    let pass = true

    let cargo = ''
    let rol_id = 0;

    let managerFilter: Sucursal[] = []

    users.filter(user => {

      if (user.rol_id === 3 && this.typeBranch == 'almacen') {
        managerFilter.push(user)
        
      } else if (user.rol_id === 4 && this.typeBranch == 'tienda') {
       
        managerFilter.push(user)
      }
    });

    this.listUserBranch.filter(user => {

      if (user.rol_id === 3 && this.typeBranch == 'almacen') {
        managerFilter.push(user)
        
      } else if (user.rol_id === 4 && this.typeBranch == 'tienda') {
       
        managerFilter.push(user)
      }
    });

    if (managerFilter.length > 1) {
      let { cargo: c, rol_id: id } = managerFilter[0]
      cargo = c
      rol_id = id
      pass = false
      toast.warning(`No puedes Asignar ${managerFilter.length}  ${cargo} a esta sucursal`)
      managerFilter = []
    }

    return pass
  }
}
