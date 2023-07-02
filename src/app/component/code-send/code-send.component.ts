import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/Classes/Employee';
import { EmployeeService } from 'src/app/Services/employee.service';




@Component({
  selector: 'app-code-send',
  templateUrl: './code-send.component.html',
  styleUrls: ['./code-send.component.scss']
})
export class CodeSendComponent implements OnInit {
  constructor(private myEmployeeService: EmployeeService,
    private myRouter: Router) { }

  email: any;
  one: string = ""
  two: string = ""
  three: string = ""
  four: string = ""
  c: number = 0;
  verificationCode: string = "";
  employeesC: Employee = new Employee();

  ngOnInit(): void {
    let data = sessionStorage.getItem('emailEmp');
    if (data !== null) {
      this.email = data;
      this.email = this.email.replace('"', "");
      this.email = this.email.slice(0, -1);
    }
  }

  verification() {
    this.verificationCode = ""
    this.verificationCode += this.one + this.two + this.three + this.four;
    //נכון לעכשיו רק לקחנו את הפעיל הנוכחי ובדקנו את הקוד אימות שלו
    let data = sessionStorage.getItem('emp');
    if (data != null && data != undefined) {
      this.employeesC = JSON.parse(data) as Employee;
      if (this.verificationCode == this.employeesC.verificationCode) {
        alert("sucssfull hello " + this.employeesC.idUserNavigation?.firstName)
        this.myRouter.navigate(['/newPassword']);
      }
      else {
        alert("error")
      }
    }
    else {
      alert("error")
    }
    console.log("verificationCode:" + this.employeesC.verificationCode)
    console.log(this.verificationCode)
//יש להכניס את הקוד לשליחת SMS/EMAIL


  }
  keytab(event: any, maxLength: number) {
    this.c++;
    let nextInput = event.srcElement.nextElementSibling; // get the sibling element
    var target = event.target || event.srcElement;
    var id = target.id
    console.log(id.maxlength); // prints undefined
    if (nextInput == null)  // check the maxLength from here
      return;
    else
      nextInput.focus();   // focus if not null

  }
}
