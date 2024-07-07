import { CommonModule } from "@angular/common";
import { Component, OnInit, HostListener, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { NgbCollapseModule } from "@ng-bootstrap/ng-bootstrap";
import { NavigationComponent } from "src/app/shared/header/navigation.component";
import { SidebarComponent } from "src/app/shared/sidebar/sidebar.component";
import { DynamicModalComponent } from "../../components/dynamic-modal/dynamic-modal.component";
import { TasasComponent } from "../../components/tasas/tasas.component";
import { DynamicTableComponent } from "src/app/components/dynamic-table/dynamic-table.component";
import { AuthService } from "src/app/components/login/services/Auth.service";
import { MonedasService } from "src/app/modules/configuracion/services/monedas.service";
import { ToastService } from "src/app/services/toast/toast.service";
import { Moneda, Tasa } from "src/app/modules/configuracion/models/Moneda.model";

//declare var $: any;

@Component({
  selector: "app-full-layout",
  standalone: true,
  templateUrl: "./full.component.html",
  styleUrls: ["./full.component.scss"],
  imports: [RouterModule, SidebarComponent, NavigationComponent, CommonModule, NgbCollapseModule, DynamicModalComponent, TasasComponent]
})
export class FullComponent implements OnInit, AfterViewInit {

  @ViewChild('modalCurrency') modalCurrency!: DynamicTableComponent

  private configUser = this.authService.getUser()
  tasa: Tasa = new Tasa()

  constructor(
    public router: Router,
    private authService: AuthService,
    private monedasService: MonedasService,
    private toasService: ToastService,
    private cdr: ChangeDetectorRef
  ) { }
  public isCollapsed = false;
  public innerWidth: number = 0;
  public defaultSidebar: string = "";
  public showMobileMenu = false;
  public expandLogo = false;
  public sidebartype = "full";

  Logo() {
    this.expandLogo = !this.expandLogo;
  }

  ngOnInit() {

    if (this.router.url === "/") {
      this.router.navigate(["/dashboard"]);
    }
    this.defaultSidebar = this.sidebartype;
    this.handleSidebar();
  }

  ngAfterViewInit(): void {
    this.monedasService.getConfiguredCoins().subscribe({
      next: (monedas) => {
        //si no hay monedas entonces no va hacer nada
        if (monedas.length == 0) return
        let moneda = monedas.find(moneda => moneda.id == this.configUser.config.id) as Moneda


        let today = new Date().toISOString().slice(0, 10);

        // Verificar si alguna de las tasas tiene la misma fecha que hoy(solo día, mes y año)
        let tasas_fecha_hoy = moneda.tasas.some(item => {
          let fechaItem = new Date(item.created_at).toISOString().slice(0, 10);
          return fechaItem === today;
        });

        //si en el dia acual no se han guardado tasas levantara el modal
        if (!tasas_fecha_hoy) {
          this.openModalCurrency()
          this.cdr.detectChanges();
        }

      },
      error: (err) => {
        this.toasService.error('Error en obtener la configuración de monedas')
      },
    })

  }

  @HostListener("window:resize", ["$event"])
  onResize() {
    this.handleSidebar();
  }

  handleSidebar() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 1170) {
      this.sidebartype = "full";
    } else {
      this.sidebartype = this.defaultSidebar;
    }
  }

  toggleSidebarType() {
    switch (this.sidebartype) {
      case "full":
        this.sidebartype = "mini-sidebar";
        break;

      case "mini-sidebar":
        this.sidebartype = "full";
        break;

      default:
    }
  }
  /**
   *Levanta el modal de monedas
   *
   * @memberof FullComponent
   */
  openModalCurrency() {
    let { id, name } = this.configUser.config
    this.tasa.id_coin = id
    this.tasa.father_currency = name
    this.modalCurrency.openAndCloseModal()


  }
  /**
   *Guarda la tasas
   *
   * @memberof FullComponent
   */
  saveCurrency() {
    if (this.tasa.price == 0 || !this.tasa.price.toString().trim()) {
      this.toasService.info('Llene el campo precio diferente a 0 ')
      return
    }
    this.monedasService.createCurrencyPrice(this.tasa.id_coin, this.tasa.price).subscribe({
      next: (value) => {
        this.toasService.success('Tasa del dia creada')
        this.modalCurrency.openAndCloseModal()
      },
      error: (err) => {
        this.toasService.error('Problemas al crear la tasa')
      },
    })
  }

}
