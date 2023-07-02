import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Employee } from 'src/app/Classes/Employee';
import { PatientApply } from 'src/app/Classes/PatientApply';
import { ApplyService } from 'src/app/Services/apply.service';
import { EmployeeService } from 'src/app/Services/employee.service';
import { PatientDetailsService } from 'src/app/Services/patient-details.service';
import { TreatmentDetailsService } from 'src/app/Services/treatment-details.service';

@Component({
  selector: 'app-navigate-patient',
  templateUrl: './navigate-patient.component.html',
  styleUrls: ['./navigate-patient.component.scss']
})
export class NavigatePatientComponent implements OnInit {

  constructor(private applyService: ApplyService,
    private employeeService: EmployeeService,
    private myRouter: Router,
    private treatmentDetailsService: TreatmentDetailsService,
    private datePipe: DatePipe,
    private snackBar: MatSnackBar,
    private patientDetailsService:PatientDetailsService,
  ) { }
  countP:number=0;
  isOk:boolean=false;
  applyList: any;
  isExist: boolean = false;
  nameEmployee: any;
  currentEmplo: Employee = new Employee();
  applyListByStatusAwaitingExecution: any;
  countApplyMam: number = 0;
  countApplyBeti: number = 0;
  countApplyFinish: number = 0;
  detailsAnother: string = "-";
  isNotEmp: boolean = false;
  zman: string = "";
  searchText: string = "";
  newApplyList: PatientApply[] = [];
  newApplyListA: PatientApply[] = [];
  title:string="הפניות שלי"
  currentA: PatientApply = new PatientApply();
  isPressM:boolean=false;
  arrayApply: PatientApply[] = [];
  countApplyMy: number = 0;

  ngOnInit(): void {
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
          if (d.getHours() > 22 && d.getHours() <= 24 || d.getHours() >= 0 && d.getHours() <= 6)
            this.zman = "לילה טוב לך ";

    this.employeeService.getEmployee().subscribe(empL => {
      this.nameEmployee = empL?.idUserNavigation?.firstName;
      this.currentEmplo = empL;
      if (this.currentEmplo.job?.id != 5)
        this.isNotEmp = true;
        this.applyService.getAllAppliesEmployee(this.currentEmplo.id).subscribe(arrayApplyI => {
          this.countApplyMy = Object.keys(arrayApplyI).length;
          //applyList=כל הפניות המשוייכות וששויכו
          this.applyList = arrayApplyI;
          this.detailsApply();
        },
          err => { console.log("error") });
    },
      err => { console.log("error") });

  }

  detailsApply() {
    for (let i = 0; i < this.applyList.length; i++) {
      this.newApplyList.push(this.currentA);
      this.newApplyList[i].apply = this.applyList[i];
      if (this.newApplyList[i].apply) {
        this.treatmentDetailsService.GetTreatmentDetailsByApplyState(this.applyList[i].id).
          subscribe(newTreatmentDetails => {
            this.newApplyList[i].treatment = newTreatmentDetails;
            if (newTreatmentDetails.dateNow != null && newTreatmentDetails.dateNow != undefined) {
              let d = newTreatmentDetails.dateNow;
              if (d != null && d != undefined) {
                let didi = this.datePipe.transform(d, 'dd/MM/yyyy')
                if (didi != null && didi != undefined)
                  this.newApplyList[i].dateEndTreatment = "" + didi;
              }
            }
            if (this.newApplyList[i].treatment?.nextStepId == 2) {
              let d = new Date();
              let did = this.datePipe.transform(d, 'dd:MM:yyyy')

              if (this.datePipe.transform(this.newApplyList[i]?.treatment?.dateTask, 'dd:MM:yyyy') == did) {
                this.countP += 1;
              }
            }
            this.patientDetailsService.getPatientDetailsByApplyId(this.applyList[i].id).
              subscribe(patientDetails => {
                this.newApplyList[i].patientDetails = patientDetails;
                this.countApplyFinish = Object.keys(this.newApplyList.filter(x => x.treatment?.statusId == 5)).length;
                this.countApplyBeti = Object.keys(this.newApplyList.filter(x => x.treatment?.statusId == 4)).length;
                this.countApplyMam = Object.keys(this.newApplyList.filter(x => x.treatment?.statusId == 3 ||
                  x.treatment?.statusId == 3007)).length;
                  this.isOk = true;
                  this.newApplyListA = this.newApplyList
                  if (this.countP > 1) {
                    const config = new MatSnackBarConfig();
                    //  config.duration = 2000;
                    config.direction = 'rtl'
                    this.snackBar.open("  נקבעו " + this.countP + " פגישות להיום , אנא עדכן האם בוצע ", 'הסר', config)
                  }
              },
                err => { console.log("error") });
          },
            err => { console.log("error") });
      }
      this.currentA = new PatientApply();
    }
  }
  hidden = false;
  fillNewApply(item: any) {
    if (item != null) {
      this.myRouter.navigate(['/showDetailsApply/' + item.apply?.id]);
    }
    else alert("לחצתם על פניה לא קיימת")

  }
  awaitingExecution(i: any) {
  this.newApplyListA = [];
    //הסתיימו
    if (i == 1) {
      this.title="פניות שהסתיימו"
      this.newApplyListA = this.newApplyList.filter(x => x.treatment?.statusId == 5);
      this.isPressM = true;

    }
    //ביפול
    else if (i == 2) {
      this.title="פניות בטיפול"

      this.newApplyListA = this.newApplyList.filter(x => x.treatment?.statusId == 4);
      this.isPressM = true;

    }
    //ממתין לביצוע
    else if (i == 3) {
      this.title="פניות הממתינות ביצוע"

      this.newApplyListA = this.newApplyList.filter(x => x.treatment?.statusId == 3 ||
        x.treatment?.statusId == 3007);
        this.isPressM = true;
    }
    //הפניות שלך
    else if (i == 4) {
      this.title="פניות שלי"

      this.newApplyListA = this.newApplyList;
      this.isPressM = true;

    }
    // כלל הפניות
    else if (i == 5) {
      this.title="כלל הפניות "

      this.newApplyListA = this.arrayApply
      this.isPressM = false;
    }
  }
  inTake() {
    this.myRouter.navigate(['/inTakeNav']);
  }
  return() {
    if (this.currentEmplo.job?.id == 1) {
      this.myRouter.navigate(['/manager']);
    }
    else if (this.currentEmplo.job?.id == 3)
      this.myRouter.navigate(['/navigateSecretary']);
    else if (this.currentEmplo.job?.id == 4)
      this.myRouter.navigate(['/inTakeNav']);
    else if (this.currentEmplo.job?.id == 5)
      this.myRouter.navigate(['/navigatePatient']);
  }
  newApply() {
    this.myRouter.navigate(['/newApplySecretery']);
  }
}
