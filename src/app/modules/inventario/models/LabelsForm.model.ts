export class LabelsFormProprieties {
    title_modal: string = ''
    view_discard: boolean = true
    view_save: boolean = true
    mode_view: 'preview' | 'form' = 'form'

    constructor(mode: 'preview' | 'form') {
        if (mode == 'preview') {
            this.view_discard = true
            this.view_save = false
            this.title_modal = 'Previsualización  del formulario'
            this.mode_view = mode
        } else {
            this.view_discard = true
            this.view_save = true
            this.title_modal = 'Crear atributos'
            this.mode_view = mode
        }
    }
}