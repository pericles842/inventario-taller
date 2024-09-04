import { AuthService } from "../components/login/services/Auth.service";
import { Modules } from "../enum/Modules";
import { Access } from "./Access";

/**
 *MOdelo de las vistas de los botones
 *
 * @export
 * @class GeneralMenu
 */

export class GeneralMenu {
  loading: boolean = false
  access: Access = new Access()
  readonly: boolean = false

  public viewButtons: ViewButtons = {
    go_to_create: false,
    create_label: 'Guardar',
    create: false,
    search: false,
    descartar: false,
    delete: false,
    archivar: false
  };
  public mode_presentation: TypeViewMenu = TypeViewMenu.PRESENTATION

  constructor(authService: AuthService | undefined = undefined, modules: Modules | undefined = undefined) {
    if (authService && modules) this.accessModule(authService, modules)
    this.viewButtons = this.presentation()
  }
  /**
   *Modo presentación
   *
   * @protected
   * @return {*}  {ViewButtons}
   * @memberof GeneralMenu
   */
  public presentation(): ViewButtons {
    
    this.readonly = true
    this.mode_presentation = TypeViewMenu.PRESENTATION
    return this.personalizedView({
      create_label: 'Crear',
      go_to_create: true,
      create: false,
      descartar: false,
      search: true,
      delete: false,
      archivar: false
    })
  }
  /**
   *Este modo muestran todos los botones
   *
   * @public
   * @return {*}  {ViewButtons}
   * @memberof GeneralMenu
   */
  public totalMenu(): ViewButtons {
    this.mode_presentation = TypeViewMenu.TOTAL_MENU
    return this.personalizedView({
      create_label: 'Crear',
      go_to_create: false,
      create: true,
      descartar: true,
      search: true,
      delete: true,
      archivar: false
    })
  }
  /**
   * modo solo crear
   *
   * @public
   * @return {*}  {ViewButtons}
   * @memberof GeneralMenu
   */
  /**
   * Este modo solo va a renderizar los botones GUARDAR , DESCARTAR Y BUSCAR
   *
   * @public
   * @return {*}  {ViewButtons}
   * @memberof GeneralMenu
   */
  public createOrEditMode(): ViewButtons {
    this.mode_presentation = TypeViewMenu.JUST_CREATE
    return this.personalizedView({
      create_label: 'Crear',
      go_to_create: false,
      create: true,
      descartar: true,
      search: true,
      delete: false,
      archivar: false
    })
  }

  /**
   *vista de botones personalizada
   *
   * @public
   * @param {ViewButtons} config_btn
   * @return {*}  {ViewButtons}
   * @memberof GeneralMenu
   */
  public personalizedView(config_btn: ViewButtons = this.viewButtons): ViewButtons {
    this.viewButtons.go_to_create = config_btn.go_to_create
    this.viewButtons.create = config_btn.create
    this.viewButtons.search = config_btn.search
    this.viewButtons.descartar = config_btn.descartar
    this.viewButtons.delete = config_btn.delete
    this.viewButtons.archivar = config_btn.archivar
    this.viewButtons.create_label = config_btn.create_label == undefined ? 'Guardar' : config_btn.create_label
    this.mode_presentation = TypeViewMenu.PERSONALIZED_VIEW
    return this.viewButtons
  }
  /**
   *este metodo obteine los permisos del usuario y los almacena
   *
   * @param {AuthService} authService servicio de autenticación
   * @param {Modules} modules modulo del sistema
   * @memberof GeneralMenu
   */
  public accessModule(authService: AuthService, modules: Modules) {
    this.loading = true

    authService.accessModule(modules).subscribe({
      next: (access) => {
        this.access = access
        this.loading = false
      }, error: (err) => {
        this.loading = false
        console.log('Error en permisos')
      },
    })
  }
}

/**
 *Vistas del menu general
 *
 * @export
 * @enum {number}
 */
export enum TypeViewMenu {
  /**
   *  SOLO SE MOSTRARA BOTON VAMOS A CREAR
   */
  PRESENTATION = 0,

  /**
   *$ CREAR , BUSCAR DESCARTAR
   */
  TOTAL_MENU = 1,
  /**
   * crear , descartar
   */
  JUST_CREATE = 2,

  /**
   * botones personalizados 
   */
  PERSONALIZED_VIEW = 3
}

/**
 *Objeto vista botones
 *
 * @export
 * @interface ViewButtons
 */
export interface ViewButtons {
  create_label: string;
  go_to_create: boolean;
  create: boolean;
  delete: boolean;
  archivar: boolean;
  search: boolean;
  descartar: boolean;
}