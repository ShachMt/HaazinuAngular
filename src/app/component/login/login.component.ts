import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from 'src/app/Classes/Employee';
import { EmployeeService } from 'src/app/Services/employee.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public user: Employee = new Employee();
  form!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private myRouter: Router,
    private snackBar: MatSnackBar) { }
  employeesList: Employee[] = [];
  EmailToLogin !: string;
  //משתנה השומר את האימייל שנכנס
  //משתנה השומר את הסיסמה שהוזנה
  PassToLogin: string = "";
  //פעיל ריק
  emplo!: Employee;
  count: number = 0;
  emploEmail: Employee = new Employee();
  //משתנה השומר את התשובה שתחזור מהפונקצייה השולפת את שם הפעיל
  Ans: string = "";
  isI: boolean = false;
  isForget: boolean = false;

  ngOnInit(): void {
    this.isI = false;
    this.count = 0;
    this.form = this.formBuilder.group({
      emailV: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      passwordV: [null, [Validators.required, Validators.pattern("^[a-z0-9A-Z_-]{4,15}$")]]

    });
    //הצגת העין לסיסמה
    const togglePassword1 = document.querySelector("#togglePassword1");
    const password1 = document.querySelector("#password1");
    togglePassword1?.addEventListener('click', function () {
      // toggle the type attribute
      const type1 = password1?.getAttribute("type") === "password" ? "text" : "password";
      password1?.setAttribute("type", type1);

      // toggle the icon
      togglePassword1?.classList.toggle("");
    });
    const button1 = document.getElementById('btn1');

    button1?.addEventListener('click', function handleClick(event) {
      console.log('button clicked');
      console.log(event);
      console.log(event.target);
    });
  }
  getErrorMessageEmail() {

    if (this.form.get('emailV')?.hasError('required')) {
      return 'שדה חובה-אנא הכנס כתובת אימייל';
    }
    return this.form.get('emailV')?.hasError('pattern') ? 'כתובת המייל אינה תקינה' : '';
  }
  getErrorMessagePassword() {
    if (this.form.get('passwordV')?.hasError('required')) {
      return '  שדה חובה-אנא הקלד סיסמה ';
    }
    return this.form.get('passwordV')?.hasError('pattern') ? 'סיסמה שגויה אנא הקלד בין 4-15 תווים מספרים/ אותיות' : '';
  }
  //כניסה למערכת ע"י שם משתמש וסיסמה
  login() {
    if(!this.isForget){
    this.isI = false;
    this.employeeService.GetEmployeeByPasswordEmail(this.EmailToLogin, this.PassToLogin).subscribe(emp => {
      this.emplo = emp;
      if (this.emplo) {
        sessionStorage.setItem("userId", JSON.stringify(emp.id));
        if (!this.isI)
          this.Checklogin();
      }
      else {
        alert("פרטיך אינם מזוהים במערכת אנא פנה למנהל המערכת");
      }
    },
      err => { console.log("error") });
    }

  }

  //בדיקת שם משתמש וסיסמה וכן ניווטים מותאמים
  Checklogin() {
    //אפשרות של 3 פעמים אפשרות של שכחתי ססמה אחרת המשתמש חסום  לכניסה ונשלחת בקשה למנהל המערכת -count-
    if (this.emplo.password == null) {
      if (this.count == 3) {
        this.employeeService.getEmployee().subscribe(emp => {
          this.emplo = emp;
          this.emplo.lockOutEnabled = true;
          this.employeeService.UpdateEmployee(this.emplo.id, this.emplo).subscribe(empU => {
            alert("משתמש חסום לגישה אנא פנה למנהל המערכת");
            console.log(empU);
          },
            err => { console.log("error") });
        },
          err => { console.log("error") });
      }
      else {
        alert("אופס.. סיסמתך שגויה-נסה שנית ");
        this.count += 1;
      }
    }
    else {

      if (this.emplo.lockOutEnabled == false) {
        const config = new MatSnackBarConfig();
        config.duration = 2000;
        config.direction = 'rtl'
        const snackBarRef = this.snackBar.open(" שלום לך " + this.emplo.idUserNavigation?.firstName + " היקר", 'הסר', config);
        snackBarRef.onAction().subscribe(() => {
          const snackBarContainer = document.getElementsByClassName('mat-snack-bar-container')[0] as HTMLElement;
          snackBarContainer.style.display = 'flex';
          snackBarContainer.style.justifyContent = 'center';
          snackBarContainer.style.alignItems = 'center';
        });

        if (this.emplo.job?.id == 1)
          this.myRouter.navigate(['/manager']);
        else if (this.emplo.job?.id == 3)
          this.myRouter.navigate(['/navigateSecretary']);
        else if (this.emplo.job?.id == 4)
          this.myRouter.navigate(['/inTakeNav']);
        else if (this.emplo.job?.id == 5)
          this.myRouter.navigate(['/navigatePatient']);
      }
      else {
        this.isI = true;
        alert("משתמש חסום לגישה אנא פנה למנהל המערכת");
      }
    }
  }

  forgetPassword() {
    this.isForget=true;
    this.employeeService.GetEmployeeByEmail(this.EmailToLogin).subscribe(emp => {
      this.emploEmail = emp;
      this.checkforgetPassword();

    },
      err => {
        console.log("error");
        alert("פרטיך אינם מזוהים במערכת אנא פנה למנהל המערכת");
      });
  }
  checkforgetPassword() {
    sessionStorage.setItem("emp", JSON.stringify(this.emploEmail));
    sessionStorage.setItem("userId", JSON.stringify(this.emploEmail.id));
    sessionStorage.setItem("emailEmp", JSON.stringify(this.EmailToLogin));
    this.isForget=false;
    this.myRouter.navigate(['/forgetPassword']);
  }
}

