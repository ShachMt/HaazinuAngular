import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AgeRangeService {
  readonly V_API = environment.apiUrl+'/AgeRange';

  constructor(private Http:HttpClient) { }
  GetIdAgeRangeByAge(age:any):Observable<any>{
    return this.Http.get<any>(`${this.V_API}/${'GetIdAgeRangeByAge'}/${age}`);
 
}
}
