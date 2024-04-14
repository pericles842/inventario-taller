import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
  {
    path: '',
    title: 'Configuración',
    icon: 'bi bi-speedometer2',
    class: '',
    extralink: true,
    submenu: []
  },
  {
    path: 'usuarios/create-users',
    title: 'Usuarios',
    icon: 'bi bi-person-fill-add',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '',
    title: 'Moneda',
    icon: 'bi bi-currency-exchange',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '',
    title: 'Cargos',
    icon: 'bi bi-person-vcard',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '',
    title: 'Sucursales',
    icon: '',
    class: '',
    extralink: true,
    submenu: []
  },
  {
    path: 'sucursales/tiendas/create-shop',
    title: 'Tiendas',
    icon: 'bi bi-shop-window',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: 'sucursales/almacenes/create-store',
    title: 'Almacenes',
    icon: 'bi bi-box2-fill',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '',
    title: 'Asignar usuarios',
    icon: 'bi bi-people-fill',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '',
    title: 'Inventario',
    icon: 'bi bi-people-fill',
    class: '',
    extralink: true,
    submenu: []
  },
  {
    path: '',
    title: 'Productos',
    icon: 'bi bi-basket3-fill',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/dashboard',
    title: 'Stocks',
    icon: 'bi bi-graph-up',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '',
    title: 'Documentos',
    icon: 'bi bi-people-fill',
    class: '',
    extralink: true,
    submenu: []
  },
  { 
    path: '',
    title: 'Notas',
    icon: 'bi bi-file-earmark-plus-fill',
    class: '',
    extralink: false,
    submenu: [
      { 
        path: '',
        title: 'Entrada',
        icon: 'bi bi-box-arrow-in-right',
        class: '',
        extralink: false,
        submenu: []
      },
      { 
        path: '',
        title: 'Movimiento',
        icon: 'bi bi-arrow-left-right',
        class: '',
        extralink: false,
        submenu: []
      },
      { 
        path: '',
        title: 'Devolución',
        icon: 'bi bi-arrow-repeat',
        class: '',
        extralink: false,
        submenu: []
      },{ 
        path: '',
        title: 'Salida',
        icon: 'bi bi-box-arrow-right',
        class: '',
        extralink: false,
        submenu: []
      },{ 
        path: '',
        title: 'Venta',
        icon: 'bi bi-graph-up-arrow',
        class: '',
        extralink: false,
        submenu: []
      },
    ]
  },
  { 
    path: '',
    title: 'Reportes',
    icon: 'bi bi-file-text-fill',
    class: '',
    extralink: false,
    submenu: []
   },
  // {
  //   path: '',
  //   title: 'Docs--------------',
  //   icon: 'bi bi-speedometer2',
  //   class: '',
  //   extralink: true,
  //   submenu: []
  // },
  // {
  //   path: '/dashboard',
  //   title: 'Dashboard',
  //   icon: 'bi bi-speedometer2',
  //   class: '',
  //   extralink: false,
  //   submenu: []
  // },
  // {
  //   path: '/component/alert',
  //   title: 'Alert',
  //   icon: 'bi bi-bell',
  //   class: '',
  //   extralink: false,
  //   submenu: []
  // },
  // {
  //   path: '',
  //   title: 'Badges',
  //   icon: 'bi bi-patch-check',
  //   class: '',
  //   extralink: false,
  //   submenu: [
  //     {
  //       path: '/dashboard',
  //       title: 'HERmanOO',
  //       icon: 'bi bi-speedometer2',
  //       class: '',
  //       extralink: false,
  //       submenu: []
  //     },
  //     {
  //       path: '/dashboard',
  //       title: 'HERmanOO',
  //       icon: 'bi bi-speedometer2',
  //       class: '',
  //       extralink: false,
  //       submenu: []
  //     },
  //     {
  //       path: '/dashboard',
  //       title: 'HERmanOO',
  //       icon: 'bi bi-speedometer2',
  //       class: '',
  //       extralink: false,
  //       submenu: []
  //     }
  //   ]
  // },
  // {
  //   path: '/component/buttons',
  //   title: 'Button',
  //   icon: 'bi bi-hdd-stack',
  //   class: '',
  //   extralink: false,
  //   submenu: []
  // },
  // {
  //   path: '/component/card',
  //   title: 'Card',
  //   icon: 'bi bi-card-text',
  //   class: '',
  //   extralink: false,
  //   submenu: []
  // },
  // {
  //   path: '/component/dropdown',
  //   title: 'Dropdown',
  //   icon: 'bi bi-menu-app',
  //   class: '',
  //   extralink: false,
  //   submenu: []
  // },
  // {
  //   path: '/component/pagination',
  //   title: 'Pagination',
  //   icon: 'bi bi-dice-1',
  //   class: '',
  //   extralink: false,
  //   submenu: []
  // },
  // {
  //   path: '/component/nav',
  //   title: 'Nav',
  //   icon: 'bi bi-pause-btn',
  //   class: '',
  //   extralink: false,
  //   submenu: []
  // },
  // {
  //   path: '/component/table',
  //   title: 'Table',
  //   icon: 'bi bi-layout-split',
  //   class: '',
  //   extralink: false,
  //   submenu: []
  // },
  // {
  //   path: '/about',
  //   title: 'About',
  //   icon: 'bi bi-people',
  //   class: '',
  //   extralink: false,
  //   submenu: []
  // }
];
