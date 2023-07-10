import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TreatmentDetails } from '../Classes/TreatmentDetails';

@Injectable({
  providedIn: 'root'
})
export class TreatmentDetailsService {
 
    readonly V_API = environment.apiUrl+'/TreatmentDetails';

  constructor(private Http:HttpClient) { }

  
  GetAllTreatmentDetails(id:any): Observable<TreatmentDetails[]>{
    return this.Http.get<TreatmentDetails[]>(`${this.V_API}/${'GetAllTreatmentDetails'}/${id}`);
  }
  AddTreatmentDetailsI(newTreatmentDetails:TreatmentDetails): Observable<any>{
    return this.Http.post<any>(`${this.V_API}/${'AddTreatmentDetailsI'}` ,newTreatmentDetails);
  }

  AddTreatmentDetails(newTreatmentDetails:TreatmentDetails): Observable<any>{
    return this.Http.post<any>(`${this.V_API}/${'AddTreatmentDetails'}` ,newTreatmentDetails);
  }
  // getTreatmentDetailsByApplyStateId(id:any):Observable<TreatmentDetails>{
    
  //   return this.Http.get<TreatmentDetails>(`${this.V_API}/${'GetTreatmentDetailsByApplyStateId'}/${id}`);

  // }

  //החזרת שלבי הטיפול האחרון
  GetTreatmentDetailsByApplyState(id:any):Observable<TreatmentDetails>{
    
    return this.Http.get<TreatmentDetails>(`${this.V_API}/${'GetTreatmentDetailsByApplyState'}/${id}`);

  }
  updateTreatmentDetails(id:any,updateTreat:TreatmentDetails):Observable<any>{
    return this.Http.put<any>(`${this.V_API}/${'UpdateTreatmentDetails'}/${id}`,updateTreat)
  }
  UpdateTreatmentDetailsII(id:any,updateTreat:TreatmentDetails):Observable<any>{
    return this.Http.put<any>(`${this.V_API}/${'UpdateTreatmentDetailsII'}/${id}`,updateTreat)
  }
  deleteTreatmentDetails(id:any,applyId:any):Observable<any>{
    return this.Http.delete<any>(`${this.V_API}/${'DeleatTreatmentDetails'}/${id}/${applyId}`);
  }
  employeesApply(idApply:any):Observable<number>{
    return this.Http.get<number>(`${this.V_API}/${'EmployeesApply'}/${idApply}`);
  }
  getTreatmentDetailsByApplyTask(idApply:any,idTask:any):Observable<TreatmentDetails>{
    return this.Http.get<TreatmentDetails>(`${this.V_API}/${'GetTreatmentDetailsByApplyTask'}/${idApply}/${idTask}`)
  }
}
