import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CauseReferral } from '../Classes/CauseReferral';
@Injectable({
  providedIn: 'root'
})
export class TheCauseReferralService {
  readonly V_API = environment.apiUrl+'/TheCauseReferral';
  constructor(private Http:HttpClient) { }
  GetAllTheCauseReferral(): Observable<CauseReferral[]>{
    return this.Http.get<CauseReferral[]>(this.V_API+'/GetAllTheCauseReferral');
  }
  UpdateTheCauseReferral(id:any,UpdateTheCauseReferral:CauseReferral):Observable<any>{
    return this.Http.put<any>(`${this.V_API}/${'UpdateTheCauseReferral'}/${id}`,UpdateTheCauseReferral)
  }
}
