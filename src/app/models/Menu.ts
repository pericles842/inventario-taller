/**
 *MOdelo de las vistas de los botones
 *
 * @export
 * @class GeneralMenu
 */
export class GeneralMenu {
  protected viewButtons!: ViewButtons
  protected type_view: TypeViewMenu = TypeViewMenu.PRESENTATION

  constructor(type_view: TypeViewMenu, personalice_btn?: ViewButtons) {
    switch (type_view) {

      case TypeViewMenu.PRESENTATION:
        this.presentation()
        break;

      case TypeViewMenu.TOTAL_MENU:
        this.totalMenu()
        break;

      case TypeViewMenu.JUST_CREATE:
        this.justCreate()
        break;

      case TypeViewMenu.PERSONALIZED_VIEW:
        this.personalizedView(personalice_btn)
        break;

      default:
        this.presentation()
        break;
    }
  }
  /**
   *Modo presentación
   *
   * @protected
   * @return {*}  {ViewButtons}
   * @memberof GeneralMenu
   */
  protected presentation(): ViewButtons {
    this.viewButtons.create = true
    this.viewButtons.search = true
    this.viewButtons.descartar = true
    this.viewButtons.delete = false
    this.viewButtons.archivar = false

    return this.viewButtons
  }
  /**
   *Este modo muestran todos los botones
   *
   * @protected
   * @return {*}  {ViewButtons}
   * @memberof GeneralMenu
   */
  protected totalMenu(): ViewButtons {
    this.viewButtons.create = true
    this.viewButtons.search = true
    this.viewButtons.descartar = true
    this.viewButtons.delete = true
    this.viewButtons.archivar = true

    return this.viewButtons
  }
  /**
   * modo solo crear
   *
   * @protected
   * @return {*}  {ViewButtons}
   * @memberof GeneralMenu
   */
  protected justCreate(): ViewButtons {
    this.viewButtons.create = true
    this.viewButtons.descartar = true
    this.viewButtons.search = false
    this.viewButtons.delete = false
    this.viewButtons.archivar = false

    return this.viewButtons
  }

  /**
   *vista de botones personalizada
   *
   * @protected
   * @param {ViewButtons} config_btn
   * @return {*}  {ViewButtons}
   * @memberof GeneralMenu
   */
  protected personalizedView(config_btn: ViewButtons = this.viewButtons): ViewButtons {
    this.viewButtons.create = config_btn.create
    this.viewButtons.search = config_btn.search
    this.viewButtons.descartar = config_btn.descartar
    this.viewButtons.delete = config_btn.delete
    this.viewButtons.archivar = config_btn.archivar

    return this.viewButtons
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
   * crear , buscar , descartar
   */
  PRESENTATION = 0,

  /**
   *$ Todos los botones 
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
  create: boolean;
  delete: boolean;
  archivar: boolean;
  search: boolean;
  descartar: boolean;
}