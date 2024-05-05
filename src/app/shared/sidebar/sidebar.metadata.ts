// Sidebar route metadata
export interface RouteInfo {
  id?:number;
  path: string;
  title: string;
  icon: string;
  authorized?:boolean;
  class: string;
  extralink: boolean;
  submenu: RouteInfo[];
}
