import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PatientDetails } from '../Classes/PatientDetails';

@Injectable({
  providedIn: 'root'
})
export class PatientDetailsService {
  readonly V_API = environment.apiUrl+'/PatientDetails';
currentGender:string="";
currentAge:string="";
currentIsInstition:boolean=false;
currentPatientDetails:PatientDetails=new PatientDetails();
  constructor(private Http:HttpClient) { }

  AddPatientDetails(newPatientDetails:PatientDetails): Observable<any>{
    return this.Http.post<any>(`${this.V_API}/${'AddPatientDetails'}` ,newPatientDetails);
  }
  UpdatePatientDetails(id:any,updatePatientDetails:PatientDetails):Observable<any>{
    return this.Http.put<any>(`${this.V_API}/${'UpdatePatientDetails'}/${id}`,updatePatientDetails)
  }
  getPatientDetailsByApplyId(id:any):Observable<PatientDetails>{
    return this.Http.get<PatientDetails>( `${this.V_API}/${'GetPatientDetailsByApplyId'}/${id}`)
  }
}
