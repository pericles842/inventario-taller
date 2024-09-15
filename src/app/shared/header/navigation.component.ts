import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, EventEmitter, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { timeout } from 'rxjs';
import { AuthService } from 'src/app/components/login/services/Auth.service';
import { Usuario } from 'src/app/modules/configuracion/models/UsuariosModel';
import { ToastService } from 'src/app/services/toast/toast.service';




@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [NgbDropdownModule, CommonModule],
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements AfterViewInit, OnInit {

  @Output() toggleSidebar = new EventEmitter<void>();


  public showSearch = false;

  public usuario: Usuario = new Usuario()

  public hexadecimalColor: string = ''


  constructor(
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.usuario = this.authService.getUser()

    //La session expiro
    if (this.usuario === null) {
      this.toastService.warning('Por favor inicia sesión', 'Session expirada')
      
      setTimeout(() => {
        this.router.navigate(['/login'])
      }, 5000)
    }

    this.hexadecimalColor = this.hexadecimalAleatorio()


  }
  /**
   *Parsea las iniciales de lass palabras
   *
   * @readonly
   * @memberof NavigationComponent
   */
  get parseNameUser() {
    const palabras_array = this.usuario.name_user.split(' ').slice(0, 2);
    let iniciales = '';

    palabras_array.forEach(palabra => {
      // Ignorar palabras vacías
      if (palabra.length > 0) {
        // Obtener la primera letra de la palabra y convertirla a mayúscula
        iniciales += palabra.charAt(0).toUpperCase();
      }
    });
    return iniciales
  }

  hexadecimalAleatorio(): string {
    // Generar tres componentes de color aleatorios en formato hexadecimal
    const componente1 = Math.floor(Math.random() * 156 + 100).toString(16).padStart(2, '0'); // Rojo
    const componente2 = Math.floor(Math.random() * 156 + 100).toString(16).padStart(2, '0'); // Verde
    const componente3 = Math.floor(Math.random() * 156 + 100).toString(16).padStart(2, '0'); // Azul

    // Concatenar los componentes para formar el color hexadecimal
    const hexadecimal = `#${componente1}${componente2}${componente3}`;

    return hexadecimal;
  }

  /**
   *Cierra la sesión
   *
   * @memberof NavigationComponent
   */
  logout() {
    this.authService.logout()
  }
  // This is for Notifications
  notifications: Object[] = [
    {
      btn: 'btn-danger',
      icon: 'ti-link',
      title: 'Luanch Admin',
      subject: 'Just see the my new admin!',
      time: '9:30 AM'
    },
    {
      btn: 'btn-success',
      icon: 'ti-calendar',
      title: 'Event today',
      subject: 'Just a reminder that you have event',
      time: '9:10 AM'
    },
    {
      btn: 'btn-info',
      icon: 'ti-settings',
      title: 'Settings',
      subject: 'You can customize this template as you want',
      time: '9:08 AM'
    },
    {
      btn: 'btn-warning',
      icon: 'ti-user',
      title: 'Pavan kumar',
      subject: 'Just see the my admin!',
      time: '9:00 AM'
    }
  ];

  // This is for Mymessages
  mymessages: Object[] = [
    {
      useravatar: 'assets/images/users/user1.jpg',
      status: 'online',
      from: 'Pavan kumar',
      subject: 'Just see the my admin!',
      time: '9:30 AM'
    },
    {
      useravatar: 'assets/images/users/user2.jpg',
      status: 'busy',
      from: 'Sonu Nigam',
      subject: 'I have sung a song! See you at',
      time: '9:10 AM'
    },
    {
      useravatar: 'assets/images/users/user2.jpg',
      status: 'away',
      from: 'Arijit Sinh',
      subject: 'I am a singer!',
      time: '9:08 AM'
    },
    {
      useravatar: 'assets/images/users/user4.jpg',
      status: 'offline',
      from: 'Pavan kumar',
      subject: 'Just see the my admin!',
      time: '9:00 AM'
    }
  ];

  public selectedLanguage: any = {
    language: 'English',
    code: 'en',
    type: 'US',
    icon: 'us'
  }

  public languages: any[] = [{
    language: 'English',
    code: 'en',
    type: 'US',
    icon: 'us'
  },
  {
    language: 'Español',
    code: 'es',
    icon: 'es'
  },
  {
    language: 'Français',
    code: 'fr',
    icon: 'fr'
  },
  {
    language: 'German',
    code: 'de',
    icon: 'de'
  }]

  ngAfterViewInit() {

  }
}
