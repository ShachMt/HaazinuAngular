import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Family } from '../Classes/Family';

@Injectable({
  providedIn: 'root'
})
export class FamilyService {
  readonly V_API = environment.apiUrl+'/Family';

  constructor(private Http:HttpClient) { }
  AddFamily(newFamily:Family): Observable<any>{
    return this.Http.post<any>(`${this.V_API}/${'AddFamily'}` ,newFamily);
  }
  UpdateFamily(id:any,updateFamily:Family):Observable<any>{
    return this.Http.put<any>(`${this.V_API}/${'UpdateFamily'}/${id}`,updateFamily)
  }
}
