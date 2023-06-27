import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Apply } from 'src/app/Classes/Apply';
import { Employee } from 'src/app/Classes/Employee';
import { PatientApply } from 'src/app/Classes/PatientApply';
import { TreatmentDetails } from 'src/app/Classes/TreatmentDetails';
import { ApplyService } from 'src/app/Services/apply.service';
import { EmployeeService } from 'src/app/Services/employee.service';
import { PatientDetailsService } from 'src/app/Services/patient-details.service';
import { TreatmentDetailsService } from 'src/app/Services/treatment-details.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';


@Component({
  selector: 'app-reference-manager',
  templateUrl: './reference-manager.component.html',
  styleUrls: ['./reference-manager.component.scss']
})
export class ReferenceManagerComponent implements OnInit {
  // displayedColumns: string[] = ['דחיפות הפניה', 'מספר פניה', 'סטטוס הפניה', 'תאריך טיפול אחרון',
  // 'שם מטפל אחרון','סיבת הפניה'];
  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private applyService: ApplyService,
    private myRouter: Router,
    private treatmentDetailsService: TreatmentDetailsService,
    private employeeService: EmployeeService,
    private patientDetailsService: PatientDetailsService,
    private datePipe: DatePipe,
    private snackBar: MatSnackBar,
    public dialog: MatDialog

  ) { }

  isMenu: boolean = true;
  applyListFromIntake: any;
  isOkFromIntake: boolean = false;
  isClickAwait: boolean = false;
  isClickAllApply: boolean = false;
  countApply: number = 0;
  countApplyAwait: number = 0;
  currentEmployees: Employee = new Employee();
  employeesListI: Employee[] = [];

  applyList: Apply[] = [];
  zman: string = "";
  //////
  isOk: boolean = false;
  arrayApply: PatientApply[] = [];
  currentA: PatientApply = new PatientApply();
  newApplyList: PatientApply[] = [];
  newApplyListA: PatientApply[] = [];
  isExist: boolean = false;
  countApplyMam: number = 0;
  countApplyBeti: number = 0;
  countApplyFinish: number = 0;
  countApplyIntake: number = 0;
  countApplyMy: number = 0;
  arrIntake: PatientApply[] = [];
  searchText: string = "";
  isPressM: boolean = false;
  title: string = "כלל הפניות";
  isPressSivoug: boolean = false;
  isDelete: boolean = false;
  countP: number = 0
  newApplyP: PatientApply[] = [];

  ngOnInit(): void {
    var d = new Date();
    this.isOk = false;
    this.isDelete = false;
    this.employeeService.GetAllEmployees().subscribe(emp => {
      this.employeesListI = emp.filter(x => x.lockOutEnabled == true);
    }, err => { console.log("error") });
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
      //כל הפניות
      this.applyService.GetAllApplies().subscribe(arrayApplies => {
        this.countApply = arrayApplies.length;
        for (let i = 0; i < arrayApplies.length; i++) {
          this.arrayApply.push(this.currentA);
          this.arrayApply[i].apply = arrayApplies[i];
          if (this.arrayApply[i].apply) {
            this.treatmentDetailsService.GetTreatmentDetailsByApplyState(arrayApplies[i].id).
              subscribe(newTreatmentDetails => {
                this.arrayApply[i].treatment = newTreatmentDetails;
                if (newTreatmentDetails.dateNow != null && newTreatmentDetails.dateNow != undefined) {
                  let d = newTreatmentDetails.dateNow;
                  if (d != null && d != undefined) {
                    let didi = this.datePipe.transform(d, 'dd/MM/yyyy')
                    if (didi != null && didi != undefined)
                      this.arrayApply[i].dateEndTreatment = "" + didi;
                  }
                }
                this.patientDetailsService.getPatientDetailsByApplyId(arrayApplies[i].id).
                  subscribe(patientDetails => {
                    this.arrayApply[i].patientDetails = patientDetails;
                    this.isOk = true;
                    this.newApplyListA = this.arrayApply;

                  },
                    err => { console.log("error") });
                // }
              },
                err => { console.log("error") });
          }
          this.currentA = new PatientApply();
        }
        //כך הפניות שלי
        this.applyService.getAllAppliesEmployee(this.currentEmployees.id).subscribe(arrayApplyI => {
          this.countApplyMy = Object.keys(arrayApplyI).length;
          //applyList=כל הפניות המשוייכות וששויכו
          this.applyList = arrayApplyI;
          this.detailsApply();
         
          this.applyService.GetAllApplyByStatus(2).
            subscribe(arrayApply => {
              this.countApplyIntake = Object.keys(arrayApply).length;
            },
              err => { console.log("error") });
        },
          err => { console.log("error") });
      },
        err => { console.log("error") });

    },
      err => { console.log("error") });
  }
  // dataSource = new MatTableDataSource<PatientApply>(this.newApplyListA);
  // ngAfterViewInit() {
  //   // this.newApplyListA.paginator = this.paginator;
  // }
  hidden = false;

  toggleBadgeVisibility() {
    // this.hidden = !this.hidden;
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
                this.newApplyP.push(this.newApplyList[i]);
              }
            }
            this.patientDetailsService.getPatientDetailsByApplyId(this.applyList[i].id).
              subscribe(patientDetails => {
                if(this.newApplyP[i])
                this.newApplyP[i].patientDetails = patientDetails;
                this.newApplyList[i].patientDetails = patientDetails;
                this.countApplyFinish = Object.keys(this.newApplyList.filter(x => x.treatment?.statusId == 5)).length;
                this.countApplyBeti = Object.keys(this.newApplyList.filter(x => x.treatment?.statusId == 4)).length;
                this.countApplyMam = Object.keys(this.newApplyList.filter(x => x.treatment?.statusId == 3 ||
                  x.treatment?.statusId == 3007)).length;
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
  awaitingExecution(i: any) {
    this.newApplyListA = [];
    this.isPressSivoug = false;
    //הסתיימו
    if (i == 1) {
      this.title = "פניות שהסתיימו"
      this.newApplyListA = this.newApplyList.filter(x => x.treatment?.statusId == 5);
      this.isPressM = true;

    }
    //ביפול
    else if (i == 2) {
      this.title = "פניות בטיפול"

      this.newApplyListA = this.newApplyList.filter(x => x.treatment?.statusId == 4);
      this.isPressM = true;

    }
    //ממתין לביצוע
    else if (i == 3) {
      this.title = "פניות הממתינות לביצוע"

      this.newApplyListA = this.newApplyList.filter(x => x.treatment?.statusId == 3 ||
        x.treatment?.statusId == 3007);
      this.isPressM = true
    }
    //הפניות שלך
    else if (i == 4) {
      this.title = "הפניות שלי"

      this.newApplyListA = this.newApplyList;
      this.isPressM = true;

    }
    // כלל הפניות
    else if (i == 5) {
      this.title = "כלל הפניות "
      this.newApplyListA = this.arrayApply
      this.isPressM = false;
    }
    // סיווג מנהלי
    else if (i == 6) {
      this.title = "פניות לסיווג מנהלי"
      this.isPressM = !this.isPressM;
      this.isPressSivoug = true;
      this.newApplyListA = this.arrayApply.filter(x => x.treatment?.statusId == 2)
    }
    else if (i == 7) {
      this.title = "  פניות הממתינות לקביעת פגישה להיום"
      this.isPressM = true;
      this.newApplyListA = this.newApplyP
    }
  }
  deleteApply(i: any) {
    if (i != null) {
      this.applyService.deleteApply(i).subscribe(emp => {
        // רענון נתונים
        this.isDelete = false;
        location.reload();
      }, err => { console.log("error") });
    }
  }
  sivoug(id: any) {
    this.myRouter.navigate(['/newTratmentDetailsManager/' + id]);

  }
  openDeleteDialog(item: any) {
    this.isDelete = true
    const dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      result.delete && this.deleteApply(item.apply?.id);
      this.isDelete = false;
    });

  }
  addTreatmentDetails(item: any) {
    
    this.isPressSivoug=false;
    if(item.treatment?.statusId==2){
      this.isPressSivoug=true;
    }
    if (!this.isPressSivoug && !this.isDelete && (item.treatment?.statusId != 6)) {
      this.myRouter.navigate(['/showDetailsApply/' + item.apply?.id]);
    }
    else if (item.treatment?.statusId == 6 && !this.isDelete) {
      this.myRouter.navigate(['/fillNewApply/' + item.apply?.id]);
    }
    else if (item.treatment?.statusId == 2 && !this.isDelete) {
      this.isPressSivoug=true;
      this.myRouter.navigate(['/showDetailsApply/' + item.apply?.id + '/' + this.isPressSivoug]);
    }
    else if (item != null) {
      if (!this.isDelete)
        this.myRouter.navigate(['/showDetailsApply/' + item.apply?.id + '/' + this.isPressSivoug]);
    }
    else alert("לחצתם על פניה לא קיימת")

  }
  inTake() {
    this.myRouter.navigate(['/inTakeNav']);
  }
  newApply() {
    this.myRouter.navigate(['/newApplySecretery']);
  }
  systemActivity(i: any) {
    this.myRouter.navigate(['/systemActivity/' + i]);
  }
}
