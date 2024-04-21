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

  listUserNotBranch: { id: number, name_user: string, email: string, name_rol: string }[] = []
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

  openModalListNotBranch() {

    this.table_users.openAndCloseModal()
  }


  assignArrayUsersToBranch(items: object[]) {
    console.log(items);

  }
}
