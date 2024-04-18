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

  listUserBranch: any[] = []
  listBranch: any[] = []
  idBranch:number = -1

  typeBranch: typeBranch['typeBranch'] = 'almacen'
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
    this.branchesService.listUsersBranch().subscribe({
      next: (users) => {
        this.listUserBranch = users
        this.loading = false
      },
      error: (err) => {
        this.loading = false
        toast.error('error al listar usuarios ')
      },
    })
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
        this.loading =false
      },
      error: (err) => {
        this.loading = false
        toast.error('Error al cargar las sucursales')
      },
    })
  }
}
