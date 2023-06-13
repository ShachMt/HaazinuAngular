import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee } from '../Classes/Employee';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  currentEmployees: any;
  readonly V_API = environment.apiUrl + '/Employees';
  constructor(private Http: HttpClient) { }
  // getEmployee(id:any): Observable<Employee> {
  //   return this.Http.get<Employee>(`${this.V_API}/${'GetEmployeeById'}/${id}`);
  // }
  getEmployee() {
    let data = sessionStorage.getItem('userId');
    return this.Http.get<Employee>(`${this.V_API}/${'GetEmployeeById'}/${data}`);
    }
  getEmployeeE(id:any): Observable<Employee> {
    return this.Http.get<Employee>(`${this.V_API}/${'GetEmployeeById'}/${id}`);
  }
  GetAllEmployees(): Observable<Employee[]> {
    return this.Http.get<Employee[]>(this.V_API + '/GetAllEmployees');
  }
  GetEmployeeName(email: string, pass: string): Observable<string> {

    return this.Http.get(`${this.V_API}/${'GetEmployeeName'}/${email}/${pass}`,
      { responseType: 'text' });

  }

  GetEmployeeByEmail(email: string): Observable<Employee> {
    return this.Http.get<Employee>(`${this.V_API}/${'GetEmployeeByEmail'}/${email}`);
  }

  GetEmployeeByPasswordEmail(email: string, Password: string): Observable<Employee> {
    return this.Http.get<Employee>(`${this.V_API}/${'GetEmployeeByPasswordEmail'}/${email}/${Password}`);
  }


  //UpdateEmployeeCode
  UpdateEmployeeCode(emploApdate: any): Observable<any> {
    return this.Http.get<any>(`${this.V_API}/${'UpdateEmployeeCode'}`, emploApdate);
  }
  addEmployees(newEmployees:Employee): Observable<any>{
    return this.Http.post<any>(`${this.V_API}/${'AddEmployee'}` ,newEmployees);
  }
  //UpdateEmployee
  UpdateEmployee(id: any, employeesUpdate: Employee): Observable<any> {
    return this.Http.put<any>(`${this.V_API}/${'UpdateEmployee'}/${id}`, employeesUpdate);
  }
  deleteEmployees(id:any):Observable<any>{
    return this.Http.delete<any>(`${this.V_API}/${'DeleatEmployee'}/${id}`);
  }
}
