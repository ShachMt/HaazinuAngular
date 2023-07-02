import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Employee } from 'src/app/Classes/Employee';
import { EmployeeService } from 'src/app/Services/employee.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {
  isNot:boolean=true;
  form!: FormGroup;
  PassToLogin: string = "";
  confirmPassword: string = "";
  isValid!: boolean
  emailCurrentEmployees: string = "";
  updateEmployees: Employee = new Employee();
  result: any
  constructor(private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private snackBar: MatSnackBar,
    private myRouter: Router) { }

  ngOnInit(): void {
    this.PassToLogin = ""
    this.confirmPassword = ""
    this.form = this.formBuilder.group({
      passwordV: [null, [Validators.required, Validators.pattern("^[a-z0-9A-Z_-]{4,15}$")]],
      confirmPasswordV: [null, [Validators.required]],
    });
    const togglePassword = document.querySelector("#togglePassword");
    const password = document.querySelector("#password");
    const togglePassword1 = document.querySelector("#togglePassword1");
    const password1 = document.querySelector("#password1");

    togglePassword?.addEventListener('click', function () {
      // toggle the type attribute
      const type = password?.getAttribute("type") === "password" ? "text" : "password";
      password?.setAttribute("type", type);

      // toggle the icon
      togglePassword?.classList.toggle("bi-eye");
    });
    togglePassword1?.addEventListener('click', function () {
      // toggle the type attribute
      const type1 = password1?.getAttribute("type") === "password" ? "text" : "password";
      password1?.setAttribute("type", type1);

      // toggle the icon
      togglePassword1?.classList.toggle("bi-eye");
    });
    const button = document.getElementById('btn');
    button?.addEventListener('click', function handleClick(event) {
      console.log('button clicked');
      console.log(event);
      console.log(event.target);
    });
    const button1 = document.getElementById('btn1');

    button1?.addEventListener('click', function handleClick(event) {
      console.log('button clicked');
      console.log(event);
      console.log(event.target);
    });
  }
  //אימות ססמאות תואמות
  ConfirmPassword() {
    this.isNot=true;
    this.isValid = false;
    if (this.PassToLogin != this.confirmPassword) {
      return "הסיסמה אינה תואמת";
    }
    else if (this.confirmPassword == "") {
      if(this.PassToLogin!="")
      return "שדה חובה";
      return "";
    }
    else {
      this.isValid = true
      return "saccefull";
    }
  }
  //הודעת שגיאה 
  getErrorMessagePassword() {
    if (this.form.get('passwordV')?.hasError('required')) {
      this.isNot=false;
      return '  שדה חובה-אנא הקלד סיסמה ';
    }
    this.isNot=false;
    return this.form.get('passwordV')?.hasError('pattern') ? 'סיסמה שגויה אנא הקלד בין 4-15 תווים מספרים/ אותיות' : '';

  }
  //שינוי סיסמה לפעיל הנוכחי
  Confirm() {
    //שליפת האימייל הנוכחי ועדכון הסיסמה
    let data = sessionStorage.getItem('emp');
    if (data != null&& data!=undefined) {
      this.updateEmployees = JSON.parse(data) as Employee;}
    this.updateEmployees.verificationCode = this.PassToLogin;
    this.employeeService.UpdateEmployee(this.updateEmployees.id, this.updateEmployees).subscribe(result => {
      const config = new MatSnackBarConfig();
      config.verticalPosition = 'top';
      config.horizontalPosition = 'center';
      config.duration = 2000;
      config.direction = 'rtl'
      this.snackBar.open( this.updateEmployees.idUserNavigation?.firstName+"הסיסמה שונתה בהצלחה", 'הסר', config);
      if (this.updateEmployees.job?.id == 1)
      this.myRouter.navigate(['/manager']);
    else if (this.updateEmployees.job?.id == 3)
      this.myRouter.navigate(['/navigateSecretary']);
    else if (this.updateEmployees.job?.id == 4)
      this.myRouter.navigate(['/inTakeNav']);
    else if (this.updateEmployees.job?.id == 5)
      this.myRouter.navigate(['/navigatePatient']);
    },
      err => { console.log("error") });

  }
 

}
