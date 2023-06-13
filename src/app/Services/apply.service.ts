import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Apply } from '../Classes/Apply';

@Injectable({
  providedIn: 'root'
})
export class ApplyService {
  readonly V_API = environment.apiUrl+'/Apply';
currentApplyToInTake:Apply=new Apply();

currentApplyId = sessionStorage.getItem('applyId');

  constructor(private Http:HttpClient) { }
  
  GetAllApplies(): Observable<Apply[]>{
    return this.Http.get<Apply[]>(this.V_API+'/GetAllApplies');
  }
  getAllAppliesByStatusEmailTerapist(idEmployees:any,idStatus:any): Observable<Apply[]>{
    return this.Http.get<Apply[]>( `${this.V_API}/${'GetAllAppliesByStatusEmailTerapist'}/${idEmployees}/${idStatus}`);
  }

  getAllAppliesByEmployee(idEmployees:any): Observable<Apply[]>{
    return this.Http.get<Apply[]>( `${this.V_API}/${'GetAllAppliesByEmployee'}/${idEmployees}`);
  } 

  getAllAppliesEmployee(idEmployees:any): Observable<Apply[]>{
    return this.Http.get<Apply[]>( `${this.V_API}/${'GetAllAppliesEmployee'}/${idEmployees}`);
  }


  getApplyById(idApply:any): Observable<Apply>{
    return this.Http.get<Apply>(`${this.V_API}/${'GetApplyById'}/${idApply}`);
  }
  GetAllApplyByStatus(idStatus:any):Observable<Apply[]>{
    return this.Http.get<Apply[]>(`${this.V_API}/${'GetAllApplyByStatus'}/${idStatus}`)
  }
  getAllAppliesByPhone(phone:any):Observable<Apply[]>{
    return this.Http.get<Apply[]>(`${this.V_API}/${'GetAllAppliesByPhone'}/${phone}`)
  }
  
  AddApply(newApply:Apply): Observable<any>{
    return this.Http.post<any>(`${this.V_API}/${'AddApply'}` ,newApply);
  }
  UpdateApply(id:any,updateApply:Apply):Observable<any>{
    return this.Http.put<any>(`${this.V_API}/${'UpdateApply'}/${id}`,updateApply)
  }
  deleteApply(id:any):Observable<any>{
    return this.Http.delete<any>(`${this.V_API}/${'DeleatApply'}/${id}`);
  }


}
