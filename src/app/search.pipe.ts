import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(values: string[], searchInput: string): any[]{
    if(!searchInput) {
        return  [];
    }

   searchInput = searchInput.toLowerCase();
   return values.filter(
       x =>x.toLowerCase().includes(searchInput)
   )
 }

}
