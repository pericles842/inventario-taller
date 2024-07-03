import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sequence'
})
export class SequencePipe implements PipeTransform {

  transform(value: number, digits: number = 4): string {
    if (isNaN(value) || value == -1) {
      return '0'.repeat(digits)
    }

    const correlativo = String(value).padStart(digits, '0');
    return `${correlativo}`;
  }

}
