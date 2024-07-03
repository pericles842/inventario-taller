import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextUppercaseDirective } from './text-uppercase.directive';



@NgModule({
  declarations: [TextUppercaseDirective],
  imports: [
    CommonModule
  ],
  exports: [TextUppercaseDirective]
})
export class DirectiveModule { }
