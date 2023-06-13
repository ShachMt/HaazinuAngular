import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apply } from 'src/app/Classes/Apply';
import { Employee } from 'src/app/Classes/Employee';
import { PatientApply } from 'src/app/Classes/PatientApply';
import { ApplyService } from 'src/app/Services/apply.service';
import { EmployeeService } from 'src/app/Services/employee.service';
import { PatientDetailsService } from 'src/app/Services/patient-details.service';
import { TreatmentDetailsService } from 'src/app/Services/treatment-details.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-in-take-nav',
  templateUrl: './in-take-nav.component.html',
  styleUrls: ['./in-take-nav.component.scss']
})
export class InTakeNavComponent implements OnInit {

  constructor(private applyService:ApplyService,
              private employeeService: EmployeeService,
              private myRouter:Router,
              private patientDetailsService:PatientDetailsService,
              private treatmentDetailsService:TreatmentDetailsService,
              private datePipe: DatePipe,
              private location: Location,

              ) { }
isOk:boolean=false;
  applyList: any;
  applyListI:any;
  countApplyMy:number=0;
  countApplyMam:number=0;
  searchText:string="";
  nameEmployee:any;
  currentEmplo:Employee=new Employee();
  applyListByStatusAwaitingExecution:any;
  countApply:number=0;
  detailsAnother:string="-";
  isNotEmp:boolean=false;
  zman:string="";
  isPressM:boolean=false;
  newApplyListA: PatientApply[] = [];
  newApplyList: PatientApply[] = [];
  arrayApply:PatientApply[] = [];
  currentA:PatientApply=new PatientApply();
  title:string="הפניות שלי"

  ngOnInit(): void {
    var d=new Date();
  if(d.getHours()>=6 && d.getHours()<=12)
  this.zman="בוקר טוב לך "
  else
  if( d.getHours()>=12&&new  Date().getHours()<=18)
  this.zman="צהריים טובים לך "
  else
  if(d.getHours()>=18&&d.getHours()<=22)
  this.zman="ערב טוב לך "
  else
  if(d.getHours()>=22&&d.getHours()>24|| d.getHours()>=0&& d.getHours()<=6)
  this.zman="לילה טוב לך ";

    this.employeeService.getEmployee().subscribe(empL=>{
      this.nameEmployee=empL?.idUserNavigation?.firstName;
      this.currentEmplo=empL;
      if(this.currentEmplo.job?.id!=4)
      this.isNotEmp=true;
    },
    err=>{console.log("error")}); 
    this.applyService.GetAllApplyByStatus(6).subscribe(arrayApplies=>{
      this.applyList=arrayApplies;
      this.countApply=Object.keys(this.applyList).length;
      for (let i = 0; i < arrayApplies.length; i++) {
        this.arrayApply.push(this.currentA);
        this.arrayApply[i].apply = arrayApplies[i];
        if (this.arrayApply[i].apply.dateNow) {
          let d = this.arrayApply[i].apply.dateNow;
          if (d != null && d != undefined) {
            let didi = this.datePipe.transform(d, 'dd/MM/yyyy')
            if (didi != null && didi != undefined)
              this.arrayApply[i].dateEndTreatment = "" + didi;
          }
        }
        this.currentA = new PatientApply();
      }
      this.newApplyListA=this.arrayApply;
      this.applyService.getAllAppliesEmployee(this.currentEmplo.id).subscribe(arrayApplyI => {
        this.countApplyMy = Object.keys(arrayApplyI).length;
        this.applyListI = arrayApplyI;
        this.detailsApply();
      },
        err => { console.log("error") });
      this.isOk=true;
    },
    err=>{console.log("error")});  
    
  }
 
  fillNewApply(item:any){
    if(item!=null){
      this.myRouter.navigate(['/fillNewApply/'+item.id]);
    }
    else alert("לחצתם על פניה לא קיימת")

  }
  detailsApply() {
    for (let i = 0; i < this.applyListI.length; i++) {
      this.newApplyList.push(this.currentA);
      this.newApplyList[i].apply = this.applyListI[i];
      if (this.newApplyList[i].apply) {
        this.treatmentDetailsService.GetTreatmentDetailsByApplyState(this.applyListI[i].id).
          subscribe(newTreatmentDetails => {
            this.newApplyList[i].treatment = newTreatmentDetails;
            if (newTreatmentDetails.dateNow != null && newTreatmentDetails.dateNow != undefined) {
              let d = newTreatmentDetails.dateNow;
              if (d != null && d != undefined) {
                let didi = this.datePipe.transform(d, 'dd/MM/yyyy')
                if (didi != null && didi != undefined)
                  this.arrayApply[i].dateEndTreatment = "" + didi;
              }
            }
            this.patientDetailsService.getPatientDetailsByApplyId(this.applyListI[i].id).
              subscribe(patientDetails => {
                this.newApplyList[i].patientDetails = patientDetails;
                this.countApplyMam = Object.keys(this.newApplyList.filter(x => x.treatment?.statusId == 3 ||
                  x.treatment?.statusId == 3007)).length;
              },
                err => { console.log("error") });
          },
            err => { console.log("error") });
      }
      this.currentA = new PatientApply();
    }
  }
  hidden = false;

  toggleBadgeVisibility() {
    // this.hidden = !this.hidden;
  }
  
  awaitingExecution(i:any){
    this.newApplyListA = [];
    //ממתין לביצוע
   if (i == 3) {
    this.title="פניות הממתינות ביצוע"
    this.newApplyListA = this.newApplyList.filter(x => x.treatment?.statusId == 3 ||
      x.treatment?.statusId == 3007);
      this.isPressM = !this.isPressM;
    }
    //הפניות שלי
    else if (i == 4) {
      this.title="פניות שלי"
      this.newApplyListA = this.newApplyList;
      this.isPressM = true;

    }  }

    return() {
      this.location.back();
    }
 newApply(){
  this.myRouter.navigate(['/newApplySecretery']);
}
}
