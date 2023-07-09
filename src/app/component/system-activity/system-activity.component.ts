import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/Classes/Employee';
import { Jobs } from 'src/app/Classes/Jobs';
import { User } from 'src/app/Classes/User';
import { EmployeeService } from 'src/app/Services/employee.service';
import { JobsService } from 'src/app/Services/jobs.service';
import { UserService } from 'src/app/Services/user.service';
import { Location } from '@angular/common';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { EducationalInstitution } from 'src/app/Classes/EducationalInstitution';
@Component({
  selector: 'app-system-activity',
  templateUrl: './system-activity.component.html',
  styleUrls: ['./system-activity.component.scss']
})
export class SystemActivityComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private jobsService: JobsService,
    private userService: UserService,
    private employeeService: EmployeeService,
    private snackBar: MatSnackBar,
    private myRouter: Router,
    private route: ActivatedRoute,
    private location: Location,
    public dialog: MatDialog

  ) { }
  form!: FormGroup;
  form1!: FormGroup;
  form2!: FormGroup;

  zman: string = "";
  currentEmployees: Employee = new Employee();

  newUser: User = new User();
  upLock:boolean=false;

  newEmployees: Employee = new Employee();
  arrayJobs: Jobs[] = [];
  employeesList: Employee[] = [];
  employeesListI:Employee[] = [];
  titleUpdate: string = "";
  valueJob: string = ""
  isUpdateEmployees: boolean = false;
  isOk: boolean = false;
  isOkI: boolean = false;
  choose: number = 0;
  newEducational:EducationalInstitution=new EducationalInstitution();
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      passwordV: [null, [Validators.required, Validators.pattern("^[a-z0-9A-Z_-]{4,15}$")]],
      mobileNumber: [null, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      selectedValueJob: [""],
      firstName: [null, [Validators.required, Validators.pattern(`^[\u0590-\u05FF .,?!"':;_()\n-\]+$`)]],
      lastName: [null, [Validators.required, Validators.pattern(`^[\u0590-\u05FF .,?!"':;_()\n-\]+$`)]],
    });
    this.form1 = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      passwordV: [null, [Validators.required, Validators.pattern("^[a-z0-9A-Z_-]{4,15}$")]],
      mobileNumber: [null, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      selectedValueJob: [""],
      firstName: [null, [Validators.required, Validators.pattern(`^[\u0590-\u05FF .,?!"':;_()\n-\]+$`)]],
      lastName: [null, [Validators.required, Validators.pattern(`^[\u0590-\u05FF .,?!"':;_()\n-\]+$`)]],
    });
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.choose = id;
    });

    var d = new Date();
    if (d.getHours() >= 6 && d.getHours() <= 12)
      this.zman = "בוקר טוב לך "
    else
      if (d.getHours() >= 12 && new Date().getHours() <= 18)
        this.zman = "צהריים טובים לך "
      else
        if (d.getHours() >= 18 && d.getHours() <= 22)
          this.zman = "ערב טוב לך "
        else
          if (d.getHours() >= 22 && d.getHours() <= 24 || d.getHours() >= 0 && d.getHours() <= 6)
            this.zman = "לילה טוב לך ";
    this.employeeService.getEmployee().subscribe(empL => {
      this.currentEmployees = empL;
    },
      err => { console.log("error") });
    this.employeeService.GetAllEmployees().subscribe(emp => {
      this.employeesList = emp;
      this.employeesListI=this.employeesList.filter(x=>x.lockOutEnabled==true)
    }, err => { console.log("error") });
    this.jobsService.GetAllJobs().subscribe(allJobs => {
      this.arrayJobs = allJobs;
    },
      err => { console.log("error") });

  }
  getErrorMessageHebrewLetters() {
    if (this.form.get('firstName')?.hasError('required')) {
      return '  שדה חובה   ';
    }
    return this.form.get('firstName')?.hasError('pattern') ? '  אותיות עברית בלבד ' : '';
  }
  getErrorMessageHebrewLetters1() {
    if (this.form1.get('firstName')?.hasError('required')) {
      return '  שדה חובה   ';
    }
    return this.form1.get('firstName')?.hasError('pattern') ? '  אותיות עברית בלבד ' : '';
  }
  getErrorMessageHebrewLLetters() {
    if (this.form.get('lastName')?.hasError('required')) {
      return '  שדה חובה   ';
    }
    return this.form.get('lastName')?.hasError('pattern') ? '  אותיות עברית בלבד ' : '';
  }
  getErrorMessageHebrewLLetters1() {
    if (this.form1.get('lastName')?.hasError('required')) {
      return '  שדה חובה   ';
    }
    return this.form1.get('lastName')?.hasError('pattern') ? '  אותיות עברית בלבד ' : '';
  }
  getErrorMessageEmail1() {
    if (this.form1.get('email')?.hasError('required')) {
      return 'שדה חובה-אנא הכנס כתובת אימייל';
    }
    return this.form1.get('email')?.hasError('pattern') ? 'כתובת המייל אינה תקינה' : '';
  }
  getErrorMessagePassword1() {
    if (this.form1.get('passwordV')?.hasError('required')) {
      return '  שדה חובה-אנא הקלד סיסמה ';
    }
    return this.form1.get('passwordV')?.hasError('pattern') ? 'סיסמה שגויה אנא הקלד בין 4-15 תווים מספרים/ אותיות' : '';
  }
  getErrorMessageMobileNumber1() {
    if (this.form1.get('mobileNumber')?.hasError('required')) {
      return '  שדה חובה   ';
    }
    return this.form1.get('mobileNumber')?.hasError('pattern') ? '  מספר טלפון שגוי   ' : '';
  }
  onSelectedValueJob1() {
    console.log(this.form1.get('selectedValueJob')?.value);
    this.newEmployees
  }
  getErrorMessageEmail() {
    if (this.form.get('email')?.hasError('required')) {
      return 'שדה חובה-אנא הכנס כתובת אימייל';
    }
    return this.form.get('email')?.hasError('pattern') ? 'כתובת המייל אינה תקינה' : '';
  }
  getErrorMessagePassword() {
    if (this.form.get('passwordV')?.hasError('required')) {
      return '  שדה חובה-אנא הקלד סיסמה ';
    }
    return this.form.get('passwordV')?.hasError('pattern') ? 'סיסמה שגויה אנא הקלד בין 4-15 תווים מספרים/ אותיות' : '';
  }
  getErrorMessageMobileNumber() {
    if (this.form.get('mobileNumber')?.hasError('required')) {
      return '  שדה חובה   ';
    }
    return this.form.get('mobileNumber')?.hasError('pattern') ? '  מספר טלפון שגוי   ' : '';
  }
  addEducation(){

  }
  onSelectedValueJob() {
    console.log(this.form.get('selectedValueJob')?.value);
    this.newEmployees
  }
  addNewUser() {
    this.userService.AddUser(this.newUser).subscribe(userEmployees => {
      this.newEmployees.idUser = userEmployees;
      this.eddEmp();
    },
      err => { console.log("error") });
  }
  eddEmp() {
    this.newEmployees.verificationCode = "";
    this.newEmployees.jobId=this.arrayJobs.find(x=>x.details==this.form.get('selectedValueJob')?.value)?.id
    // this.newEmployees.jobId = (Number)(this.newEmployees.jobId);
    this.employeeService.addEmployees(this.newEmployees).subscribe(employees => {
      this.newEmployees.id = employees;
      const config = new MatSnackBarConfig();
      // config.verticalPosition = 'top';
      config.panelClass = ['center-snackbar'];
      config.horizontalPosition = 'center';
      config.duration = 3000;
      config.direction = 'rtl'
      this.snackBar.open(this.newUser.firstName + "  " + this.newUser.lastName + " נוסף בהצלחה", 'הסר', config);
      this.newEmployees=new Employee();
      this.newUser=new User();
      this.myRouter.navigate(['/manager']);
    },
      err => { console.log("error") });
  }
  addEmployees() {
    this.isOkI = false;
    for (let i = 0; i < this.employeesList.length; i++) {
      if (this.employeesList[i].email == this.newEmployees.email||
        this.employeesList[i].idUserNavigation?.phone==this.newUser.phone) {
        this.isOkI = true;
        break;
      }
    }
    if (this.isOkI)
      alert("  שם משתמש זה קיים במערכת ")
    else
      this.addNewUser();
  }
  newEmployeesI() {
    this.newEmployees = new Employee();
    this.newUser = new User();

  }
  openDeleteDialog(item:any) {
    const dialogRef=this.dialog.open(DeleteDialogComponent);
     dialogRef.afterClosed().subscribe(result => {
       result.delete&&this.deleteEmployees(item.id);
     });
     
   }
  deleteEmployees(item: any) {
    this.employeeService.deleteEmployees(item).subscribe(emp => {
       location.reload();
    }, err => { console.log("error") });
  }
  updateEmployees(item: any) {
    this.isUpdateEmployees = true;
    this.titleUpdate = " עדכון עובד  " + item.idUserNavigation?.lastName + " " + item.idUserNavigation?.firstName;
    this.newUser = item.idUserNavigation;
    this.valueJob = item.job.details;
    this.newEmployees = item;
  }
  updateEmployeesI() {
    this.updateUser();
  }
  updateUser() {
    this.newUser.id = this.newEmployees.idUser;
    this.userService.UpdateUser(this.newUser.id, this.newUser).subscribe(emp => {
      this.updateEMployees();
    }, err => { console.log("error") });
  }
  updateEMployees() {
    this.employeeService.UpdateEmployee(this.newEmployees.id, this.newEmployees).subscribe(emp => {
      this.isUpdateEmployees = false;
      const config = new MatSnackBarConfig();
      config.panelClass = ['center-snackbar'];
      // config.verticalPosition = 'top';
      config.horizontalPosition = 'center';
      config.duration = 3000;
      config.direction = 'rtl'
      this.snackBar.open(this.newEmployees.idUserNavigation?.firstName + "  " 
      + this.newUser.lastName + " עודכן בהצלחה", 'הסר', config);
      // location.reload();
      this.newEmployees=new Employee();
      this.newUser=new User();
    }, err => { console.log("error") });
  }
  updateLock(i:any){
    i.lockOutEnabled=false;
    this.upLock=false;

    this.employeeService.UpdateEmployee(i.id, i).subscribe(emp => {
this.upLock=true;
    }, err => { console.log("error") });

  }
  systemActivity(i:any) {
    this.myRouter.navigate(['/systemActivity/'+i]);
  }
  return() {

    this.location.back();

    // if (this.currentEmployees.job?.id == 1) {
    //   this.myRouter.navigate(['/manager']);
    // }
    // else if (this.currentEmployees.job?.id == 3)
    //   this.myRouter.navigate(['/navigateSecretary']);
    // else if (this.currentEmployees.job?.id == 4)
    //   this.myRouter.navigate(['/inTakeNav']);
    //   else if (this.currentEmployees.job?.id ==5)
    //   this.myRouter.navigate(['/navigatePatient']);
  }
}
