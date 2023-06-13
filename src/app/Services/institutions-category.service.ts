import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InstitutionsCategory } from '../Classes/InstitutionsCategory';

@Injectable({
  providedIn: 'root'
})
export class InstitutionsCategoryService {
  readonly V_API = environment.apiUrl+'/InstitutionsCategory';
indexCurrentListInstitutionsCategory:number=0;
currentCategory:InstitutionsCategory=new InstitutionsCategory();
currentListCategory = sessionStorage.getItem('currentListCategory');
isTvach:boolean=true;
  constructor(private Http:HttpClient) { }

  GetAllInstitutionsCategoriesByGenderAndAge(gender:any,age:any): Observable<InstitutionsCategory[]>{
    return this.Http.get<InstitutionsCategory[]>(`${this.V_API}/${'GetAllInstitutionsCategoriesByGenderAndAge'}/${gender}/${age}`);
  }
  
  AddInstitutionsCategory(newEduCtegory:InstitutionsCategory): Observable<any>{
    return this.Http.post<any>(`${this.V_API}/${'AddInstitutionsCategory'}` ,newEduCtegory);
  }
}
