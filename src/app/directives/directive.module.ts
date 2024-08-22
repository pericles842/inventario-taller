import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextUppercaseDirective } from './text-uppercase.directive';
import { TooltipDirective } from './tooltip.directive';



@NgModule({
  declarations: [TextUppercaseDirective, TooltipDirective],
  imports: [
    CommonModule
  ],
  exports: [TextUppercaseDirective, TooltipDirective]
})
export class DirectiveModule { }
