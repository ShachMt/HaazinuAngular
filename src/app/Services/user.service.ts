import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../Classes/User';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  userAskerFromApi:User=new User();
  
  readonly V_API = environment.apiUrl+'/Users';

  constructor(private Http:HttpClient) { }

  GetAllUsers(): Observable<User[]>{
    return this.Http.get<User[]>(this.V_API+'/GetUsers');
  }
  // GetAllUsers(): Observable<User[]>{
  //   return this.Http.get<User[]>(this.V_API+'/GetUsers');
  // }
  GetUserByPhone(phone:string):Observable<User>{
    
    return this.Http.get<User>(`${this.V_API}/${'GetUserByPhone'}/${phone}`);
 
}

  AddUser(newUser:User): Observable<any>{
    return this.Http.post<any>(`${this.V_API}/${'AddUser'}` ,newUser);
  }
  UpdateUser(id:any,updateUser:User):Observable<any>{
    return this.Http.put<any>(`${this.V_API}/${'UpdateUser'}/${id}`,updateUser)
  }
}
