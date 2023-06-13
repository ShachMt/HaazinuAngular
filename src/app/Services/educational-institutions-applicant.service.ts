import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EducationalInstitutionsApplicant } from '../Classes/EducationalInstitutionsApplicant';

@Injectable({
  providedIn: 'root'
})
export class EducationalInstitutionsApplicantService {
  readonly V_API = environment.apiUrl+'/EducationalInstitutionsApplicant';

  constructor(private Http:HttpClient) { }
  
  AddEducational(newEducational:EducationalInstitutionsApplicant): Observable<any>{
    return this.Http.post<any>(`${this.V_API}/${'AddEducational'}` ,newEducational);
  }

  getAllEducationalInstitution(idUser:any): Observable<EducationalInstitutionsApplicant[]> {
      return this.Http.get<EducationalInstitutionsApplicant[]>(`${this.V_API}/${'GetAllEducationalInstitution'}/${idUser}`);
  }
  getAllEducationalInstitutionByUserIdStatus(idUser:any,status:any): Observable<EducationalInstitutionsApplicant[]> {
    return this.Http.get<EducationalInstitutionsApplicant[]>(`${this.V_API}/${'GetAllNameEducationalInstitution'}/${idUser}/${status}`);
}
deleteEducational(id:any):Observable<any>{
  return this.Http.delete<any>(`${this.V_API}/${'DeletEducational'}/${id}`);
}
updateEducational(id: any, updateEducational: EducationalInstitutionsApplicant): Observable<any> {
  return this.Http.put<any>(`${this.V_API}/${'UpdateEducational'}/${id}`, updateEducational);
}
}
