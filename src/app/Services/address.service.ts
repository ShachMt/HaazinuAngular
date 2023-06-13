import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Address } from '../Classes/Address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  readonly V_API = environment.apiUrl+'/Address';
  constructor(private Http:HttpClient) { }
  AddAddress(newAddress:Address): Observable<any>{
    return this.Http.post<any>(`${this.V_API}/${'AddAddress'}` ,newAddress);
  }
  UpdateAddress(id:any,updateAddress:Address):Observable<any>{
    return this.Http.put<any>(`${this.V_API}/${'UpdateAddress'}/${id}`,updateAddress)
  }
  GetAllCities(): Observable<string[]>{
    return this.Http.get<string[]>(this.V_API+'/GetAllCities');
  }
  getIdAddressByCity(cityName:string):Observable<any>{
    return this.Http.get<any>(`${this.V_API}/${'GetIdAddressByCity'}/${cityName}`);
  }
}
