import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[tooltip]'
})
export class TooltipDirective  {

  @Input('tooltip') tooltipText: string = 'Tolltip';
  tooltipElement: HTMLElement|null = null;

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

  private showTooltip() {
    this.tooltipElement = this.renderer.createElement('span');
    this.renderer.appendChild(
      this.tooltipElement,
      this.renderer.createText(this.tooltipText) // Texto del tooltip
    );

    this.renderer.appendChild(document.body, this.tooltipElement);
    
    this.renderer.setStyle(this.tooltipElement, 'position', 'fixed');
    this.renderer.setStyle(this.tooltipElement, 'backgroundColor', '#333');
    this.renderer.setStyle(this.tooltipElement, 'color', '#fff');
    this.renderer.setStyle(this.tooltipElement, 'padding', '5px 10px');
    this.renderer.setStyle(this.tooltipElement, 'borderRadius', '4px');
    this.renderer.setStyle(this.tooltipElement, 'zIndex', '1000');
    this.renderer.setStyle(this.tooltipElement, 'fontSize', '15px');

    const hostPos = this.el.nativeElement.getBoundingClientRect();

    const tooltipPos = {
      top: hostPos.bottom + window.scrollY + 5 + 'px',
      left: hostPos.left + window.scrollX + 'px'
    };

    this.renderer.setStyle(this.tooltipElement, 'top', tooltipPos.top);
    this.renderer.setStyle(this.tooltipElement, 'left', tooltipPos.left);
  }

  private hideTooltip() {
    this.renderer.removeChild(document.body, this.tooltipElement);
    this.tooltipElement = null;
  }
}