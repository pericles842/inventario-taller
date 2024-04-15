import { Component, OnInit } from '@angular/core';
import { Columns } from 'src/app/interfaces/ConfigsFormsData.interface';
import { BranchesService } from '../../service/sucursales.service';
import * as toast from 'toastr';

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

  constructor(
    private branchesService: BranchesService
  ) { }

  ngOnInit(): void {
    this.columns = this.branchesService.columns_users
    this.listUsersBranch()
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
}
