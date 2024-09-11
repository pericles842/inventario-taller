import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[tooltip]'
})
export class TooltipDirective {

  @Input('tooltip') tooltipText: string = 'Tolltip';
  /**
   *si es true la fuente sera mas pequeña para mostrar mas información
   *
   * @type {boolean}
   * @memberof TooltipDirective
   */
  @Input('tooltipQuestion') tooltipQuestion: boolean = false
  tooltipElement: HTMLElement | null = null;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseenter') onMouseEnter() {

    if (!this.tooltipElement) {
      this.showTooltip();
    }
  }

  @HostListener('mouseleave') onMouseLeave() {

    if (this.tooltipElement) {
      this.hideTooltip();
    }
  }

  /**
   *Agrega y valida un toltip
   *
   * @private
   * @memberof TooltipDirective
   */
  private showTooltip() {
    const tooltipClassName = 'tooltip-class';
    const existingTooltips = document.getElementsByClassName(tooltipClassName);

    if (existingTooltips.length > 0) this.renderer.removeChild(document.body, existingTooltips[0]);

    const tooltipElement = this.renderer.createElement('span');

    // agregamos clase ancla 'tooltip-class'
    this.renderer.addClass(tooltipElement, tooltipClassName);

    // calculamos posición del mause sobre el elemento
    const hostPos = this.el.nativeElement.getBoundingClientRect();
    const tooltipPos = {
      top: hostPos.bottom + window.scrollY + 5 + 'px',
      left: hostPos.left + window.scrollX + 'px'
    };

    //agregamos texto al elemento
    this.renderer.appendChild(tooltipElement, this.renderer.createText(this.tooltipText));
    //agregamos elemento la body
    this.renderer.appendChild(document.body, tooltipElement);

    if (!this.tooltipQuestion) {
      //*tooltip
      Object.assign(tooltipElement.style, {
        position: 'fixed',
        backgroundColor: '#333',
        color: '#fff',
        padding: '5px 10px',
        borderRadius: '4px',
        zIndex: '10000',
        fontSize: '15px',
        top: tooltipPos.top,
        left: tooltipPos.left
      });
    } else {
      // *CAJA DE INFORMACION
      Object.assign(tooltipElement.style, {
        position: 'fixed',
        backgroundColor: '#fff',
        color: '#000',
        padding: '5px 10px',
        borderRadius: '4px',
        boxShadow: '0 0 10px rgba(0,0,0,0.2)',
        zIndex: '10000',
        fontSize: '12px',
        width: '10%',
        top: tooltipPos.top,
        left: tooltipPos.left
      });
    }


    this.tooltipElement = tooltipElement;
  }


  /**
   *Elimina el tooltip
   *
   * @private
   * @memberof TooltipDirective
   */
  private hideTooltip() {
    this.renderer.removeChild(document.body, this.tooltipElement);
    this.tooltipElement = null;
  }
}