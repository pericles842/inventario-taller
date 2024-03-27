import { Component, AfterViewInit, OnInit } from '@angular/core';
import { ROUTES } from './menu-items';
import { RouteInfo } from './sidebar.metadata';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule, NgIf } from '@angular/common';
//declare var $: any;

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule, NgIf],
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {

  public sidebarnavItems: RouteInfo[] = [];
  showMenu = '';
  showSubMenu = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }


  // Initialize sidebarnavItems with your route data
  ngOnInit() {
    this.sidebarnavItems = ROUTES.filter(sidebarnavItem => sidebarnavItem);
  }

  // Method to check if an item has a submenu
  hasSubMenu(item: RouteInfo): boolean {
    return item.submenu && item.submenu.length > 0;
  }

  // Method to toggle submenu visibility
  toggleSubMenu(item: RouteInfo): void {
    console.log(item);
    
    if (this.showSubMenu === item.title) {
      this.showSubMenu = '';
    } else {
      this.showSubMenu = item.title;
    }
  }
}