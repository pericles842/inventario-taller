import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sequence'
})
export class SequencePipe implements PipeTransform {

  transform(value: number): string {
    if (isNaN(value) || value == -1) {
      return '0000';
    }

    const correlativo = String(value).padStart(4, '0');
    return `${correlativo}`;
  }

}
