import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Jobs } from '../Classes/Jobs';

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  readonly V_API = environment.apiUrl+'/Jobs';
  constructor(private Http:HttpClient) { }
  GetAllJobs(): Observable<Jobs[]>{
    return this.Http.get<Jobs[]>(this.V_API+'/GetAllJobs');
  }
  AddApply(newJob:Jobs): Observable<any>{
    return this.Http.post<any>(`${this.V_API}/${'AddJob'}` ,newJob);
  }
  UpdateJobs(id:any,updateJob:Jobs):Observable<any>{
    return this.Http.put<any>(`${this.V_API}/${'UpdateJobs'}/${id}`,updateJob)
  }
  deleteJobs(idJob:any):Observable<any>{
    return this.Http.delete<any>(`${this.V_API}/${'DeleatJob'}/${idJob}`)
  }
}
