import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DetailsAsker } from '../Classes/DetailsAsker';

@Injectable({
  providedIn: 'root'
})
export class DetailsAskerService {
  readonly V_API = environment.apiUrl+'/DetailsAsker';
currentDetailsAsker:DetailsAsker=new DetailsAsker();
  constructor(private Http:HttpClient) { }

  AddDetailsAsker(newDetailsAsker:DetailsAsker): Observable<any>{
    return this.Http.post<any>(`${this.V_API}/${'AddDetailsAsker'}` ,newDetailsAsker);
  }
  getDetailsAskerByUserId(userId:any):Observable<DetailsAsker>{
    return this.Http.get<DetailsAsker>( `${this.V_API}/${'GetDetailsAskerByApplyId'}/${userId}`)
  }
  UpdateDetailsAsker(id:any,updateDetailsAsker:DetailsAsker):Observable<any>{
    return this.Http.put<any>(`${this.V_API}/${'UpdateDetailsAsker'}/${id}`,updateDetailsAsker)
  }
  getDetailsAskerByUserAskerId(userId:any):Observable<DetailsAsker>{
    return this.Http.get<DetailsAsker>( `${this.V_API}/${'GetDetailsAskerByUserAskerId'}/${userId}`)
  }
  getIdDetailsAsker(userId:any):Observable<number>{
    return this.Http.get<number>( `${this.V_API}/${'GetIdDetailsAsker'}/${userId}`)
  }
}
