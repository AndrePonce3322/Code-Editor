import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(array: string[], args: string | null): string[] {
    if (!args) {
      return array;
    }

    let result: string[] = [];

    for (const value of array) {

      if (value.indexOf(args) !== -1) {
        result = [...result, value];
      }
    }

    return result;
  }
}
