import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Terapist } from '../Classes/Terapist';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TerapistService {
  readonly V_API = environment.apiUrl+'/Terapist';
  
  constructor(private Http:HttpClient) { }
  addTerapist(newTerapist:Terapist): Observable<any>{
    debugger
    return this.Http.post<any>(`${this.V_API}/${'AddTerapist'}` ,newTerapist);
  }
  updateTerapist(id:any,updateTerapist:Terapist):Observable<any>{
    return this.Http.put<any>(`${this.V_API}/${'UpdateTerapist'}/${id}`,updateTerapist)
  }
  getAllTerapists(): Observable<Terapist[]>{
    return this.Http.get<Terapist[]>(this.V_API+'/GetAllTerapist');
  }
  deleteTerapist(idTerapist:any):Observable<any>{
    return this.Http.delete<any>(`${this.V_API}/${'DeleatTerapist'}/${idTerapist}`)
  }
}
