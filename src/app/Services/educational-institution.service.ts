import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EducationalInstitution } from '../Classes/EducationalInstitution';

@Injectable({
  providedIn: 'root'
})
export class EducationalInstitutionService {
  readonly V_API = environment.apiUrl+'/EducationalInstitution';

  constructor(private Http:HttpClient) { }
  GetAllInstitutionsByCategories(idCategory:any):Observable<EducationalInstitution[]>{
    return this.Http.get<EducationalInstitution[]>(`${this.V_API}/${'GetAllInstitutionsCategoriesByGender'}/${idCategory}`);
}
AddEducationalInstitution(newEducationalInstitution:EducationalInstitution): Observable<any>{
  return this.Http.post<any>(`${this.V_API}/${'AddEducationalInstitution'}` ,newEducationalInstitution);
}
}
