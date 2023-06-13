import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/Classes/Employee';
import { EmployeeService } from 'src/app/Services/employee.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  constructor(private myActiveRout:ActivatedRoute,
              private myEmployeeService:EmployeeService,
              private myRouter:Router) { }
email:string=""
succedSend:any
  ngOnInit(): void {
    let data = sessionStorage.getItem('emailEmp');
    if (data !== null) {
      this.email = data;
    this.email=this.email.replace('"',"");
    this.email = this.email.slice(0, -1);

  }
  }
  
  
sendCode(){

  this.myRouter.navigate(['/codeSend']);
}

}
