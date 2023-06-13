import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tasks } from '../Classes/Tasks';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  readonly V_API = environment.apiUrl+'/Task';

  constructor(private Http:HttpClient) { }
  getAllTasks(): Observable<Tasks[]>{
    return this.Http.get<Tasks[]>(this.V_API+'/GetAllTasks');
  }
}
