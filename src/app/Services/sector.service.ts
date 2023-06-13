import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Sector } from '../Classes/Sector';

@Injectable({
  providedIn: 'root'
})
export class SectorService {
  readonly V_API = environment.apiUrl+'/Sector';

  constructor(private Http:HttpClient) { }

  GetAllSector(): Observable<Sector[]>{
    return this.Http.get<Sector[]>(this.V_API+'/GetAllSector');
  }
  AddSector(newSector:Sector): Observable<any>{
    return this.Http.post<any>(`${this.V_API}/${'AddSector'}` ,newSector);
  }
}
