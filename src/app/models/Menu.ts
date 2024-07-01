/**
 *MOdelo de las vistas de los botones
 *
 * @export
 * @class GeneralMenu
 */
export class GeneralMenu {

  public viewButtons: ViewButtons = {
    create: false,
    search: false,
    descartar: false,
    delete: false,
    archivar: false
  };
  public mode_presentation: TypeViewMenu = TypeViewMenu.PRESENTATION

  constructor() {
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
    this.viewButtons.create = true
    this.viewButtons.search = true
    this.viewButtons.descartar = true
    this.viewButtons.delete = false
    this.viewButtons.archivar = false
    this.mode_presentation = TypeViewMenu.PRESENTATION
    return this.viewButtons
  }
  /**
   *Este modo muestran todos los botones
   *
   * @public
   * @return {*}  {ViewButtons}
   * @memberof GeneralMenu
   */
  public totalMenu(): ViewButtons {
    this.viewButtons.create = true
    this.viewButtons.search = true
    this.viewButtons.descartar = true
    this.viewButtons.delete = true
    this.viewButtons.archivar = false
    this.mode_presentation = TypeViewMenu.TOTAL_MENU
    return this.viewButtons
  }
  /**
   * modo solo crear
   *
   * @public
   * @return {*}  {ViewButtons}
   * @memberof GeneralMenu
   */
  public justCreate(): ViewButtons {
    this.viewButtons.create = true
    this.viewButtons.descartar = true
    this.viewButtons.search = false
    this.viewButtons.delete = false
    this.viewButtons.archivar = false
    this.mode_presentation = TypeViewMenu.JUST_CREATE
    return this.viewButtons
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
    this.viewButtons.create = config_btn.create
    this.viewButtons.search = config_btn.search
    this.viewButtons.descartar = config_btn.descartar
    this.viewButtons.delete = config_btn.delete
    this.viewButtons.archivar = config_btn.archivar
    this.mode_presentation = TypeViewMenu.PERSONALIZED_VIEW
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