import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MatureCharacter } from '../Classes/MatureCharacter';

@Injectable({
  providedIn: 'root'
})
export class MatureCharacterService {
  readonly V_API = environment.apiUrl+'/MatureCharacter';

  constructor(private Http:HttpClient) { }

  AddMatureCharacter(newMatureCharacter:MatureCharacter): Observable<any>{
    return this.Http.post<any>(`${this.V_API}/${'AddMatureCharacter'}` ,newMatureCharacter);
  }
  UpdateMatureCharacter(id:any,updateMatureCharacter:MatureCharacter):Observable<any>{
    return this.Http.put<any>(`${this.V_API}/${'UpdateMatureCharacter'}/${id}`,updateMatureCharacter)
  }
  
}
