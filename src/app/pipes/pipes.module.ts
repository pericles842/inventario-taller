import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SequencePipe } from './sequence.pipe';



@NgModule({
  declarations: [SequencePipe],
  imports: [CommonModule],
  exports: [SequencePipe]
})
export class PipesModule { }
