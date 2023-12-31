import { Component, HostListener, Input, OnInit, Directive, ViewChild } from '@angular/core';
import { Employee } from 'src/app/Classes/Employee';
import { Tasks } from 'src/app/Classes/Tasks';
import { EmployeeService } from 'src/app/Services/employee.service';
import { TaskService } from 'src/app/Services/task.service';
import { ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TreatmentDetails } from 'src/app/Classes/TreatmentDetails';
import { ActivatedRoute, Router } from '@angular/router';
import { TreatmentDetailsService } from 'src/app/Services/treatment-details.service';
import { DatePipe } from '@angular/common';
import { Location } from '@angular/common';
import { ApplyService } from 'src/app/Services/apply.service';
import { Apply } from 'src/app/Classes/Apply';


@Component({
  selector: 'app-new-treatment-details',
  templateUrl: './new-treatment-details.component.html',
  styleUrls: ['./new-treatment-details.component.scss']
})

export class NewTreatmentDetailsComponent implements OnInit {
  @Input() sivoug!: boolean;
  @Input() IsSec!: boolean;
  @Input() item!:TreatmentDetails;
  constructor(private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private taskService: TaskService,
    private renderer: Renderer2,
    private route: ActivatedRoute,
    private treatmentDetailsService: TreatmentDetailsService,
    private myRouter: Router,
    private datePipe: DatePipe,
    private location: Location,
    private applyService: ApplyService,
  ) {

  }
  arrayLevelUrgency = [
    { id: 1, name: "VIP" },
    { id: 2, name: "דחוף" },
    { id: 3, name: "רגיל" }
  ];
  form = new FormGroup({
    selectNextTask: new FormControl('', Validators.required),
    date: new FormControl("", [Validators.required]),
    dateTime: new FormControl(new Date(), [Validators.required]),
    hebrewLettersDetailsTask: new FormControl(''),
    hebrewLetters: new FormControl('', Validators.required),
    time: new FormControl(""),
    place: new FormControl(""),
    selectNextTaskIsEmplo: new FormControl(''),
    s: new FormControl(''),
  });
  form1: FormGroup = new FormGroup({
    date: new FormControl(new Date(), [Validators.required]),
    selectNextEmplo: new FormControl('', Validators.required),
    hebrewLetters: new FormControl('', [Validators.required]),
    dateTime: new FormControl(new Date(), [Validators.required]),
    selectNextTaskIsEmplo: new FormControl(''),
    selectDescreptionC:new FormControl(''),
  });
  form2: FormGroup = new FormGroup({
    hebrewLetters: new FormControl('', [Validators.required]),
    date: new FormControl(new Date(), [Validators.required]),
    s: new FormControl(''),
  });
  currentTreatmentDetails: TreatmentDetails = new TreatmentDetails();
  ofiCurrent: string = "";
  Dchi:string="";
  newTreatmentDedails: TreatmentDetails = new TreatmentDetails();
  currentApply:Apply=new Apply();
  isEdkoud: boolean = true;
  isEdkoudB: boolean = true;
  isClick: boolean = true;
  selectedTime: string = "";
  dateNow: Date = new Date();
  emp: any;
  nameFill: string = "";
  arrayTasks: Tasks[] = [];
  selectedValueT: string = "";
  selectTaskN: string = "";
  modalPresentation: string = "";
  isOkDate: boolean = true;
  dd!: Date;
  isOkDateEmp: boolean = true;
  isEmplo: boolean = false;
  arrayEmplo: Employee[] = [];
  isEmploC:boolean=false;
  b:string="";
  isDetails: boolean = false;
  employeesId: string = "";
  dadeN: Date = new Date();
  shiyouchPnia: string = "";
  place: string = "";
  isPlace: boolean = false;
  arrayEmploI: Employee[] = [];
  ngOnInit(): void {
  
  if(this.item) {
  this.newTreatmentDedails=this.item;
  this.ofiCurrent=""+this.newTreatmentDedails.task?.taskName;
 
}
  else{
    this.newTreatmentDedails.dateNow = new Date();
    this.newTreatmentDedails.dateTask = new Date();
  }
    this.IsSec
    this.isEdkoud = true;
    this.isEmplo = false;
    this.isEmploC=false;
    
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.newTreatmentDedails.applyId = id;
      this.applyService.getApplyById(id).subscribe(apply => {
        this.currentApply=apply;
        this.Dchi=""+ this.currentApply.levelUrgency
    },
    err => { console.log("error") });
      this.treatmentDetailsService.GetTreatmentDetailsByApplyState(id).subscribe(newTreatmentDetails => {
        this.currentTreatmentDetails = newTreatmentDetails;
        if (newTreatmentDetails.statusId == 7)
          this.ofiCurrent = "פניה חדשה"
        else if(!this.item)
          this.ofiCurrent = "" + this.currentTreatmentDetails.nextStep?.taskName;
      },
        err => { console.log("error") });
    });
    this.employeeService.GetAllEmployees().subscribe(emplo => {
      this.arrayEmploI = emplo;
    },
      err => { console.log("error") });

    this.employeeService.getEmployee().subscribe(empL => {
      this.emp = empL;
      this.nameFill = this.emp?.idUserNavigation?.firstName;
      this.newTreatmentDedails.therapistId = this.emp.id;
    },
      err => { console.log("error") });
    /////////////
    this.taskService.getAllTasks().subscribe(tasks => {
      for (let index = 0; index < 8; index++) {
        this.arrayTasks.push(tasks[index])
      }
    },
      err => { console.log("error") });
    this.employeeService.GetAllEmployees().subscribe(emplo => {
      this.arrayEmplo = emplo;
    },
      err => { console.log("error") });

  }

  getErrorMessageHebrewLetters(form: any) {
    if (form.get('hebrewLetters')?.hasError('required')) {
      return '  שדה חובה   ';
    }
    return this.form.get('hebrewLetters')?.hasError('pattern') ? '' : '';
  }
  getErrorMessageHebrewLettersDetails(form: any) {
    if (form.get('hebrewLettersDetailsTask')?.hasError('required')) {
      return '  שדה חובה   ';
    }
    return this.form.get('hebrewLettersDetailsTask')?.hasError('pattern') ? ' ' : '';
  }

  getErrorSelectNextTask(form: any) {
    if (form.get('selectNextTask')?.hasError('required')) {
      return '  שדה חובה   ';
    }
    return form.get('selectNextTask')?.hasError('pattern') ? '' : '';
  }
  getErrorSelectTask(form: any) {
    if (form.get('selectTask')?.hasError('required')) {
      return '  שדה חובה   ';
    }
    return form.get('selectTask')?.hasError('pattern') ? '' : '';
  }
  getErrorSelectNextTaskIsEmplo(form: any) {

    if (form.get('selectNextTaskIsEmplo')?.hasError('required')) {
      return '  שדה חובה   ';
    }
    return form.get('selectNextTaskIsEmplo')?.hasError('pattern') ? '' : '';
  }
  getErrorMessageDateControl(form: any) {
    if (form.get('date')?.hasError('required')) {
      return '  שדה חובה   ';
    }
    return form.get('date')?.hasError('pattern') ? ' ' : '';
  }

  resizeTextarea(textarea: any) {
    this.renderer.setStyle(textarea, 'height', 'auto');
    this.renderer.setStyle(textarea, 'height', textarea.scrollHeight + 'px');
  }
  changeD(event:any){
if(event.value){
  this.currentApply.levelUrgency=event.value;
  this.applyService.UpdateApply(this.currentApply.id, this.currentApply).subscribe(resultApply => {
 debugger
 
  },
    err => { console.log("error") });
}
  }
  getEmployeesArray() {
    this.employeeService.GetAllEmployees().subscribe(emplo => {
      this.arrayEmplo = emplo;
      this.isEmplo = true;
      this.isDetails = true;
    },
      err => { console.log("error") });
  }
  //תעוד הארוע
  onSelectedValueChangeT() {
    if (this.newTreatmentDedails.taskId == 9)
      this.isEdkoud = false;
    else this.isEdkoud = true;

  }
  //במידה ומוצג רשימת הפעילים 
  selectIsEmplo() {
    debugger
    this.employeesId
    this.form.get('selectNextTaskIsEmplo')?.value
  }
  //ביצוע שלב הבא
  onSelectedValueChange() {
    this.isEmplo = false;
    this.isDetails = false;
    this.isPlace = false;
    this.isEdkoud = true;
    this.isEdkoudB = true;
    //התיעעצות פנימית / בירור נוסף
    if (this.form.get('selectNextTask')?.value == 1 || this.form.get('selectNextTask')?.value == 5)
      this.getEmployeesArray();
    //קביעת פגישה
    else if (this.form.get('selectNextTask')?.value == 2) {
      this.isPlace = true;
    }
    //משימת מזכיר/שיחה טלפונית/שיחת משוב
    else if (this.form.get('selectNextTask')?.value == 3 || this.form.get('selectNextTask')?.value == 4 || this.form.get('selectNextTask')?.value == 8)
  {
    this.isDetails = true;
this.newTreatmentDedails.nextEmployeesId=4;
  }

    //עדכון בפנייה
    else if (this.form.get('selectNextTask')?.value == 9) {
      this.isEdkoudB = false;
      this.isDetails = true;
    }
  }
  validateDate() {
if(!this.item){
    this.isOkDate = true;
    this.isOkDateEmp = true;
    let date1 = new Date(); // your first date
    let date2 = new Date(this.form.get('date')?.value); // your second date
    // Extract the date parts of each date
    let datePart1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
    let datePart2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
    // Compare the date parts
    if (datePart1 == null || datePart1 == undefined) {
      console.log('The dates are equal.');
    } else if (datePart1 > datePart2) {
      this.isOkDate = false;
    } else {
      this.isOkDate = true;
    }}
  }
  //עדכון בפניה
  selectIsEmploShiyouchPnia() {
    if (this.form2.get('s')?.value != "") {
      this.newTreatmentDedails.statusId == 1007;
      this.newTreatmentDedails.taskId == 9;
      if (this.form2.get('s')?.value == 1) {
        this.newTreatmentDedails.nextEmployeesId = this.arrayEmplo.find(e => e.job?.details == "מנהל פניות          ")?.id;
      }
      else if (this.form2.get('s')?.value == 2) {
        this.treatmentDetailsService.employeesApply(this.newTreatmentDedails.applyId).subscribe(emplo => {
          this.newTreatmentDedails.nextEmployeesId = emplo;
        },
          err => { console.log("error") });
      }
    }
  }
  
  onSubmit() {
    debugger;
    //במידה ולא נבחר עדכון בפניה-שיוך פניה למטפל
    if (!this.newTreatmentDedails.nextEmployeesId) {
      if (this.form.get('selectNextTaskIsEmplo')?.value != "")
        // this.newTreatmentDedails.nextEmployeesId = parseInt(this.employeesId);
        this.newTreatmentDedails.nextEmployeesId = Number(this.form.get('selectNextTaskIsEmplo')?.value)
      else
        this.newTreatmentDedails.nextEmployeesId = this.newTreatmentDedails.therapistId;
    }
    //כדי לקבוע סטטוס פניה
    //אם נבחר סגירת הפניה
    if (this.newTreatmentDedails.nextStepId == 7) {
      this.newTreatmentDedails.statusId = 5;
        this.currentApply.isActive = false;
        this.applyService.UpdateApply(this.currentApply.id, this.currentApply).subscribe(result => {
          console.log(result);
        },
          err => { console.log("error") });
    }
    //עדכון בפניה
    else if (this.newTreatmentDedails.nextStepId == 9) {
      this.newTreatmentDedails.statusId == 1007;
      if (this.form.get('s')?.value == 1 || this.currentTreatmentDetails.statusId == 7) {
        this.newTreatmentDedails.nextEmployeesId = this.arrayEmplo.find
          (e => e.job?.details == "מנהל פניות          ")?.id;
        if (this.currentTreatmentDetails.statusId == 7)
          this.newTreatmentDedails.statusId = 2;

      }
      else if (this.form.get('s')?.value == 2) {

        this.treatmentDetailsService.employeesApply(this.newTreatmentDedails.applyId).subscribe(emplo => {
          this.newTreatmentDedails.nextEmployeesId = emplo;
        },
          err => { console.log("error") });
      }
    }

    else {
      
      //בטיפול
      this.newTreatmentDedails.statusId = 4;}
    if (this.currentTreatmentDetails.statusId != 7)
      this.newTreatmentDedails.taskId = this.currentTreatmentDetails.nextStepId;
else{
  this.newTreatmentDedails.taskId = 3012;

}

    this.newTreatmentDedails.nextStepId = parseInt("" + this.newTreatmentDedails.nextStepId);

    if (this.form.get('time')?.value != "") {
      const time = this.selectedTime.split(':');
      if (this.newTreatmentDedails.dateTask) {
        this.newTreatmentDedails.dateTask.setHours(parseInt(time[0]));
        this.newTreatmentDedails.dateTask.setMinutes(parseInt(time[1]));
      }
    }
    //תוכן של ביצוע שלב הבא
    this.newTreatmentDedails.nextDocumentation = this.form.get(
      'hebrewLettersDetailsTask')?.value;
    //תוכן של ביצוע שלב קודם- תיעוד הארוע
    this.newTreatmentDedails.documentation = this.form.get(
      'hebrewLetters')?.value;

    if (this.form.get('place')?.value != "") {
      if (this.newTreatmentDedails.nextStepId == 2)
        this.newTreatmentDedails.nextDocumentation += " מיקום הפגישה " + this.place;
    }
    this.form.get('selectNextTask')?.value
    if(this.newTreatmentDedails.id){
      this.treatmentDetailsService.UpdateTreatmentDetailsII(this.newTreatmentDedails.id,this.newTreatmentDedails)
      .subscribe(result => {
        if (this.emp.job?.id == 1) {
          this.myRouter.navigate(['/manager']);
        }
        else if (this.emp.job?.id == 3)
          this.myRouter.navigate(['/navigateSecretary']);
        else if (this.emp.job?.id == 4)
          this.myRouter.navigate(['/inTakeNav']);
        else if (this.emp.job?.id == 5)
          this.myRouter.navigate(['/navigatePatient']);
      },
        err => { console.log("error") });
   
   
    }
    this.treatmentDetailsService.AddTreatmentDetails(this.newTreatmentDedails).subscribe(result => {
      if (this.emp.job?.id == 1) {
        this.myRouter.navigate(['/manager']);
      }
      else if (this.emp.job?.id == 3)
        this.myRouter.navigate(['/navigateSecretary']);
      else if (this.emp.job?.id == 4)
        this.myRouter.navigate(['/inTakeNav']);
      else if (this.emp.job?.id == 5)
        this.myRouter.navigate(['/navigatePatient']);
    },
      err => { console.log("error") });
  }
  
  //סיווג מנהלי
  selectDescreption(event: any){
    this.isEmploC = false;
    if(event.value=="1"){
        this.isEmploC = true;
        this.newTreatmentDedails.taskId = 1;
        this.newTreatmentDedails.statusId = 3;    }
    else if(event.value=="1013"){
      this.newTreatmentDedails.taskId = 1013;
      this.newTreatmentDedails.statusId = 7;
    }
  }
  onSubmit1() {
    debugger;
    //תוכן של ביצוע שלב קודם- תיעוד הארוע
    this.newTreatmentDedails.nextEmployeesId = this.form1.get('selectNextEmplo')?.value;
    this.newTreatmentDedails.documentation = this.form1.get('hebrewLetters')?.value;
    this.treatmentDetailsService.AddTreatmentDetails(this.newTreatmentDedails).subscribe(result => {
      if (this.emp.job?.id == 1) {
        this.myRouter.navigate(['/manager']);
      }
      else if (this.emp.job?.id == 3)
        this.myRouter.navigate(['/navigateSecretary']);
      else if (this.emp.job?.id == 4)
        this.myRouter.navigate(['/inTakeNav']);
      else if (this.emp.job?.id == 5)
        this.myRouter.navigate(['/navigatePatient']);
    },
      err => { console.log("error") });

  }
  // עדכון בפניה של מזכיר
  onSubmit2() {
    this.newTreatmentDedails.statusId = 1007;
    this.newTreatmentDedails.taskId = 9;
    this.selectIsEmploShiyouchPnia();
    this.newTreatmentDedails.dateTask = new Date();

    this.newTreatmentDedails.documentation = this.form2.get(
      'hebrewLetters')?.value;

    this.treatmentDetailsService.AddTreatmentDetails(this.newTreatmentDedails).subscribe(result => {
      if (this.emp.job?.id == 1) {
        this.myRouter.navigate(['/manager']);
      }
      else if (this.emp.job?.id == 3)
        this.myRouter.navigate(['/navigateSecretary']);
      else if (this.emp.job?.id == 4)
        this.myRouter.navigate(['/inTakeNav']);
      else if (this.emp.job?.id == 5)
        this.myRouter.navigate(['/navigatePatient']);
    },
      err => { console.log("error") });

  }
  return() {
    this.location.back();
  }
}

