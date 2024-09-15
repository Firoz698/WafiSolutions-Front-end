import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(value: any, Searchtram: any): any {
    debugger
    return value.filter(function (search: any) {
      return search.email.toLowerCase().indexOf(Searchtram.toLowerCase()) > -1;
    });
  }


}
