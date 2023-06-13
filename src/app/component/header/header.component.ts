import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/Classes/Employee';
import { EmployeeService } from 'src/app/Services/employee.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private myRouter: Router,
    private employeeService:EmployeeService) { }
  currentEmployees: Employee = new Employee();

  ngOnInit(): void {
    this.employeeService.getEmployee().subscribe(empL => {
      this.currentEmployees = empL;
    },
      err => { console.log("error") });
  }
  return(){
    if (this.currentEmployees.job?.id == 1) {
      this.myRouter.navigate(['/manager']);
    }
    else if (this.currentEmployees.job?.id == 3)
      this.myRouter.navigate(['/navigateSecretary']);
    else if (this.currentEmployees.job?.id == 4)
      this.myRouter.navigate(['/inTakeNav']);
      else if (this.currentEmployees.job?.id ==5)
      this.myRouter.navigate(['/navigatePatient']);
  }
  exit(){
    this.myRouter.navigate(['']);
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("currentListCategory");
      sessionStorage.removeItem("userPatientDetails");
      sessionStorage.removeItem("currentPatientDetails");
      sessionStorage.removeItem("currentAddress");
      sessionStorage.removeItem("currentFamily");
      sessionStorage.removeItem("currentListCategory");

  }
  }
