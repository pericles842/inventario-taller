import { Component, OnInit } from '@angular/core';
import { Columns } from 'src/app/interfaces/ConfigsFormsData.interface';
import { BranchesService } from '../../service/sucursales.service';
import * as toast from 'toastr';
import { Sucursal, typeBranch } from '../../models/Sucursal.Model';

@Component({
  selector: 'app-assign-user-to-branch-crud',
  templateUrl: './assign-user-to-branch-crud.component.html',
  styleUrls: ['./assign-user-to-branch-crud.component.scss']
})
export class AssignUserToBranchCrudComponent implements OnInit {
  type_view: number = 0
  loading: boolean = false

  columns: Columns[] = []

  listUserNotBranch: { id: number, name_user: string, email: string, name_rol: string }[] = []
  listBranch: any[] = []
  idBranch: number = -1
  listUserBranch: Sucursal[] = []

  typeBranch: typeBranch['typeBranch'] | null = null
  sucursal: Sucursal = new Sucursal()

  constructor(
    private branchesService: BranchesService
  ) { }

  ngOnInit(): void {
    this.columns = this.branchesService.columns_users
    this.listAllBranch()
    this.listUsersBranch()
  }

  get branch() {
    let filterBranch = this.listBranch.filter(branch => branch.type === this.typeBranch)
    return filterBranch
  }
  /**
   *Lista los usuarios para asignar a un sucursal
   *
   * @memberof AssignUserToBranchCrudComponent
   */
  listUsersBranch() {
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
        this.idBranch = this.listBranch[0].id
        this.loading = false
      },
      error: (err) => {
        this.loading = false
        toast.error('Error al cargar las sucursales')
      },
    })
  }
  listBranchUsers(type_branch: typeBranch["typeBranch"], id_branch: number) {
    this.branchesService.listBranchUsers(type_branch, id_branch).subscribe({
      next: (sucursal) => {
        this.listUserBranch = sucursal
      },
      error: (err) => {

        toast.error('Error al cargar usuarios de la sucursal')
      },
    })
  }
}
