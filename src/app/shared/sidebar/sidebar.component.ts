import { Component, AfterViewInit, OnInit } from '@angular/core';
import { ROUTES } from './menu-items';
import { RouteInfo } from './sidebar.metadata';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule, NgIf } from '@angular/common';
import { AuthService } from 'src/app/components/login/services/Auth.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { LoadingComponent } from "../../components/loading/loading.component";
//declare var $: any;

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  imports: [RouterModule, CommonModule, NgIf, LoadingComponent]
})
export class SidebarComponent implements OnInit {

  public sidebarnavItems: RouteInfo[] = [];
  showMenu = '';
  showSubMenu = '';
  loading: boolean = false


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private toastService: ToastService
  ) { }



  // Initialize sidebarnavItems with your route data
  ngOnInit() {
    this.sidebarnavItems = ROUTES.filter(sidebarnavItem => sidebarnavItem);
    this.getAccessUser()
  }

/**
 *Configura los menu eb base a la permisologia del usuario
 *
 * @memberof SidebarComponent
 */
getAccessUser() {
    this.loading = true
    this.authService.accessUser().subscribe({
      next: (config_permissions) => {
        
        //*ITERAMOS LOS MENU DEL PROYECTO
        for (let menu of this.sidebarnavItems) {

          //*ITERAMOS LA CONFIGURACIÓN
          for (let index_config = 0; index_config < config_permissions.length; index_config++) {
            const config = config_permissions[index_config];
            
            //*SI HAY MACH ASIGNA LA AUTORIZACIÓN EN TRUE
            if (menu.id == config.id) {
              menu.authorized = config.authorized;

              //*IEAMOS SUB MENUS 
              for (let i = 0; i < menu.submenu.length; i++) {
                let submenu = menu.submenu[i];

                if (submenu.id == config[index_config + i + 1].id) {
                  submenu.authorized = config[index_config + i + 1].authorized;
                }
              }
            }
          }
        }
        
        this.loading = false
      }, error: (err) => {
        this.loading = false
        this.toastService.error('Error en permisos')
      },
    })
  }
  // Method to check if an item has a submenu
  hasSubMenu(item: RouteInfo): boolean {
    return item.submenu && item.submenu.length > 0;
  }

  // Method to toggle submenu visibility
  toggleSubMenu(item: RouteInfo): void {

    if (this.showSubMenu === item.title) {
      this.showSubMenu = '';
    } else {
      this.showSubMenu = item.title;
    }
  }
}