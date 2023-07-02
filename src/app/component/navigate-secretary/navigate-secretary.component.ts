import { Component, OnInit ,AfterViewInit, ViewChild } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { ApplyService } from 'src/app/Services/apply.service';
import { EmployeeService } from 'src/app/Services/employee.service';
import { PatientDetailsService } from 'src/app/Services/patient-details.service';
import { TreatmentDetailsService } from 'src/app/Services/treatment-details.service';
import { DatePipe } from '@angular/common';
import { Employee } from 'src/app/Classes/Employee';
import { PatientApply } from 'src/app/Classes/PatientApply';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import {MatSort, Sort, SortDirection} from '@angular/material/sort';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Apply } from 'src/app/Classes/Apply';
@Component({
  selector: 'app-navigate-secretary',
  templateUrl: './navigate-secretary.component.html',
  styleUrls: ['./navigate-secretary.component.scss']
})
export class NavigateSecretaryComponent implements OnInit{
 
  displayedColumns: string[] = ['רמת דחיפות','טלפון','תאריך','מספר פנייה','firstName','שם משפחה','שם ממלא','סטטוס הפנייה'];
  // exampleDatabase!: PatientApply| null;
  // resultsLength = 0;
  // // אולי לשנות לשקר - אחראי על הסקרול שמסתובב
  // isLoadingResults = true;
  // isRateLimitReached = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private applyService: ApplyService,
    private patientDetailsService: PatientDetailsService,
    private myRouter: Router,
    private employeeService: EmployeeService,
    private treatmentDetailsService: TreatmentDetailsService,
    private datePipe: DatePipe,
    private snackBar: MatSnackBar,
    private _liveAnnouncer: LiveAnnouncer

  ) { }
  isOO:boolean=false;
  isOk: boolean = false;
  nameEmployee: any;
  searchText: string = "";
  searchTextP: string = "";
  dateN: string = "";
  patientApplies!: MatTableDataSource<PatientApply>;
  arrayApply: PatientApply[]=[];
  countApply: number = 0;
  currentEmployees: Employee = new Employee();
  isNotEmp: boolean = false;
  zman: string = "";
  ////////////
  isPressM: boolean = false;
  applyList: any;
  isExist: boolean = false;
  countApplyMam: number = 0;
  countApplyBeti: number = 0;
  countApplyFinish: number = 0;
  countApplyMy: number = 0;
  newApplyListA: PatientApply[] = [];
  title:string="הפניות שלי"
  currentA: PatientApply = new PatientApply();
  newApplyList: PatientApply[] = [];
  arrayMam: PatientApply[] = [];
  countExist: number = 0;
  countPast: number = 0;
  visib: boolean = false;

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
          if (d.getHours() >= 22 && d.getHours() > 24 || d.getHours() >= 0 && d.getHours() <= 6)
            this.zman = "לילה טוב לך ";

    this.employeeService.getEmployee().subscribe(empL => {
      this.nameEmployee = empL?.idUserNavigation?.firstName;
      this.currentEmployees = empL;
      if (this.currentEmployees.job?.id != 3)
        this.isNotEmp = true;
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
                    //-arrayApply-כלל הפניות
                    this.patientApplies = new MatTableDataSource(this.arrayApply);
                    this.patientApplies.sort = this.sort;
                    this.patientApplies.paginator = this.paginator;
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
          this.newApplyListA = this.newApplyList
        },
          err => { console.log("error") });
      },
        err => { console.log("error") });
      // this.applyService.GetAllApplies().subscribe(arrayApplies => {
      //   this.countApply = arrayApplies.length;
      //   for (let i = 0; i < arrayApplies.length; i++) {
      //     this.arrayApply.push(this.currentA);
      //     this.currentA = new PatientApply();
      //   }
      //   for (let i = 0; i < this.arrayApply.length; i++) {
      //     if (arrayApplies[i])
      //       this.treatmentDetailsService.GetTreatmentDetailsByApplyState(arrayApplies[i].id).subscribe(newTreatmentDetails => {
      //         this.arrayApply[i].apply = arrayApplies[i];
      //         this.arrayApply[i].treatment = newTreatmentDetails;
      //         for (let i = 0; i < this.arrayApply.length; i++) {
      //           this.patientDetailsService.getPatientDetailsByApplyId(arrayApplies[i].id).subscribe(patientDetails => {
      //             this.arrayApply[i].patientDetails = patientDetails;
      //             this.newApplyListA = this.arrayApply;

      //           },
      //             err => { console.log("error") });
      //         }
      //       },
      //         err => { console.log("error") });
      //   }
      //   this.applyService.getAllAppliesEmployee(this.currentEmployees.id).subscribe(arrayApply => {
      //     this.countApplyMy = Object.keys(arrayApply).length;
      //     this.applyList = arrayApply;
      //     //ממתין לביצוע
      //     this.applyService.getAllAppliesByStatusEmailTerapist(this.currentEmployees.id, 3).subscribe(arrayApply => {
      //       this.countApplyMam = Object.keys(arrayApply).length;

      //       for (let index = 0; index < arrayApply.length; index++) {
      //         this.isExist = false;
      //         for (let i = 0; i < this.applyList.length; i++) {
      //           if (this.applyList[i].id == arrayApply[index].id) {
      //             this.isExist = true;
      //             break;
      //           }
      //         }
      //         if (!this.isExist)
      //           this.applyList.push(arrayApply[index]);
      //       }
      //       //בטיפול
      //       this.applyService.getAllAppliesByStatusEmailTerapist(this.currentEmployees.id, 4).subscribe(arrayApply => {
      //         this.countApplyBeti = Object.keys(arrayApply).length;
      //         for (let index = 0; index < arrayApply.length; index++) {
      //           this.isExist = false;
      //           for (let i = 0; i < this.applyList.length; i++) {
      //             if (this.applyList[i].id == arrayApply[index].id) {
      //               this.isExist = true;
      //               break;
      //             }
      //           }
      //           if (!this.isExist)
      //             this.applyList.push(arrayApply[index]);
      //         }
      //         //פניות שהסתיימו
      //         this.applyService.getAllAppliesByStatusEmailTerapist(this.currentEmployees.id, 5).subscribe(arrayApply => {
      //           this.countApplyFinish = Object.keys(arrayApply).length;
      //           for (let index = 0; index < arrayApply.length; index++) {
      //             this.isExist = false;
      //             for (let i = 0; i < this.applyList.length; i++) {
      //               if (this.applyList[i].id == arrayApply[index].id) {
      //                 this.isExist = true;
      //                 break;
      //               }
      //             }
      //             if (!this.isExist)
      //               this.applyList.push(arrayApply[index]);
      //           }
      //           for (let index = 0; index < this.applyList.length; index++) {
      //             this.newApplyList.push(this.currentA);
      //             this.currentA = new PatientApply();
      //           }
      //           this.getTreatment();
      //         },
      //           err => { console.log("error") });
      //       },
      //         err => { console.log("error") });
      //     },
      //       err => { console.log("error") });
      //   },
      //     err => { console.log("error") });
      // },
      //   err => { console.log("error") });

    },
      err => { console.log("error") });

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.patientApplies.filter = filterValue.trim().toLowerCase();

    if (this.patientApplies.paginator) {
      this.patientApplies.paginator.firstPage();
    }
  }
  announceSortChange(sortState: Sort) {
  //   // This example uses English messages. If your application supports
  //   // multiple language, you would internationalize these strings.
  //   // Furthermore, you can customize the message to add additional
  //   // details about the values being sorted.
  //   if (sortState.direction) {
  //     this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
  //   } else {
  //     this._liveAnnouncer.announce('Sorting cleared');
  //   }
  //   if (this.patientApplies.paginator) {
  //     this.patientApplies.paginator.firstPage();
  //   }
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
            this.patientDetailsService.getPatientDetailsByApplyId(this.applyList[i].id).
              subscribe(patientDetails => {
                this.newApplyList[i].patientDetails = patientDetails;
                this.countApplyFinish = Object.keys(this.newApplyList.filter(x => x.treatment?.statusId == 5)).length;
                this.countApplyBeti = Object.keys(this.newApplyList.filter(x => x.treatment?.statusId == 4)).length;
                this.countApplyMam = Object.keys(this.newApplyList.filter(x => x.treatment?.statusId == 3 ||
                  x.treatment?.statusId == 3007)).length;
                this.arrayMam = this.newApplyList.filter(x => x.treatment?.statusId == 3 ||
                  x.treatment?.statusId == 3007);
                for (let i = 0; i < this.arrayMam.length; i++) {
                  if (this.arrayMam[i].treatment?.nextStepId == 2) {
                    if (this.arrayMam[i].treatment?.statusId == 3)
                      this.countExist += 1;
                    if (this.arrayMam[i].treatment?.statusId == 3007)
                      this.countPast += 1;
                  }
                  if (this.countExist > 0 || this.countPast > 0) {
                    let d = new Date();
                    let did = this.datePipe.transform(d, 'dd:MM:yyyy')
                    if (this.datePipe.transform(this.newApplyList[i]?.treatment?.dateTask, 'dd:MM:yyyy') 
                    == did) {

                     }
                 
                  }
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
    //הסתיימו
    if (i == 1) {
      this.title="פניות שהסתיימו"
      this.isOO=false;
      this.newApplyListA = this.newApplyList.filter(x => x.apply?.isActive == false);
      this.isPressM = true;

    }
    //בטיפול
    else if (i == 2) {
      this.title="פניות בטיפול"
      this.isOO=false;
      this.newApplyListA = this.newApplyList.filter(x => x.treatment?.statusId == 4);
      this.isPressM = true;

    }
    //ממתין לביצוע
    else if (i == 3) {
      this.title="פניות הממתינות ביצוע"
      this.isOO=false;
      this.newApplyListA = this.newApplyList.filter(x => x.treatment?.statusId == 3 ||
        x.treatment?.statusId == 3007);
      this.isPressM = !this.isPressM;
    }
    //הפניות שלך
    else if (i == 4) {
      this.title="פניות שלי"
      this.isOO=false;
      this.newApplyListA = this.newApplyList;
      this.isPressM = true;

    }
  }
  hidden = false;
  toggleBadgeVisibility() {
    // this.hidden = !this.hidden;
  }
  inTake() {
    this.myRouter.navigate(['/inTakeNav']);
  }
  newApply() {

    this.myRouter.navigate(['/newApplySecretery']);
  }

  showTreatmentDetails(numApply: any) {
    this.myRouter.navigate(['/showDetailsApply/' + numApply]);
  }
  return() {
    if (this.currentEmployees.job?.id == 1) {
      this.myRouter.navigate(['/manager']);
    }
    else if (this.currentEmployees.job?.id == 3)
      this.myRouter.navigate(['/navigateSecretary']);
    else if (this.currentEmployees.job?.id == 4)
      this.myRouter.navigate(['/inTakeNav']);
    else if (this.currentEmployees.job?.id == 5)
      this.myRouter.navigate(['/navigatePatient']);
  }
}