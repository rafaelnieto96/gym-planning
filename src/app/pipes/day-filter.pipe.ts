import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dayFilter'
})
export class DayFilterPipe implements PipeTransform {
  transform(items: any[], day: string): any[] {
    if (!items || !day) {
      return items;
    }
    return items.filter(item => item.day === day);
  }
}
