import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apply } from 'src/app/Classes/Apply';
import { Employee } from 'src/app/Classes/Employee';
import { PatientApply } from 'src/app/Classes/PatientApply';
import { PatientDetails } from 'src/app/Classes/PatientDetails';
import { showSecretery } from 'src/app/Classes/showSecretery';
import { TreatmentDetails } from 'src/app/Classes/TreatmentDetails';
import { ApplyService } from 'src/app/Services/apply.service';
import { EmployeeService } from 'src/app/Services/employee.service';
import { PatientDetailsService } from 'src/app/Services/patient-details.service';
import { TreatmentDetailsService } from 'src/app/Services/treatment-details.service';

@Component({
  selector: 'app-all-apply-manager',
  templateUrl: './all-apply-manager.component.html',
  styleUrls: ['./all-apply-manager.component.scss']
})
export class AllApplyManagerComponent implements OnInit {

  constructor(private applyService: ApplyService,
    private patientDetailsService: PatientDetailsService,
    private myRouter: Router,
    private employeeService: EmployeeService,
    private treatmentDetailsService: TreatmentDetailsService,
    private datePipe: DatePipe,) { }
  currentEmployees:Employee=new Employee();
  nameEmployee: any;
  searchText: string = "";
  searchTextP:string="";
  dateN: string = "";
  arrayshowSecretery: showSecretery[] = [];
  arrayshowSecreteryFilter: showSecretery[] = [];
  currentshowSecretery: showSecretery = new showSecretery();
  indexOfelement?: number;
  arrayApply: Apply[] = [];
  arrayPatientDetaild: PatientDetails[] = [];
  currentPatientDetails: PatientDetails = new PatientDetails();
  phoneApplyR: string = " ";
  phoneApply: string = " ";
  currentAllAppliesByPhone: Apply[] = [];
  countApply:number=0;
  ngOnInit(): void {
  this.employeeService.getEmployee().subscribe(empL=>{
    this.currentEmployees=empL;
  },
  err=>{console.log("error")});
  this.applyService.GetAllApplies().subscribe(arrayApplies => {
    this.arrayApply = arrayApplies;
    console.log(this.arrayApply);
    for (let i = 0; i < this.arrayApply.length; i++) {
      this.arrayshowSecretery.push(this.currentshowSecretery);
      this.addShowSecretery(i);
      this.arrayPatientDetaild.push(this.currentPatientDetails);
      this.getPatientDetailsById(this.arrayApply[i].id, i);
    }
    console.log(arrayApplies);
  },
    err => { console.log("error") });
     
}

filter(event: any, field: keyof showSecretery) {

  this.arrayshowSecretery=this.arrayshowSecretery.filter(item => `${item[field]}`?.includes(event.target.value));
}
getApplyByEmpStatus(){
  this.applyService.getAllAppliesByStatusEmailTerapist(this.currentEmployees.id,3).subscribe(arrayApply=>{
    
    this.countApply=Object.keys(arrayApply).length;
  },
  err=>{console.log("error")});
}
getStatusApply(idApply:any,i:any){
  this.treatmentDetailsService.GetTreatmentDetailsByApplyState(idApply).subscribe(newTreatmentDetails=>{
if(newTreatmentDetails.status?.details!=null){
  this.arrayshowSecretery[i].treatment=newTreatmentDetails;
    this.arrayshowSecretery[i].statusApply=""+newTreatmentDetails.status?.details;}
    else
    this.arrayshowSecretery[i].statusApply="";
  },
  err=>{console.log("error")}); 
}
addShowSecretery(i: any) {
  this.currentshowSecretery.phone = this.arrayApply[i].asker?.phone;
  if (this.arrayApply[i].dateNow != undefined)
    this.currentshowSecretery.date = "" + this.datePipe.transform(this.arrayApply[i].dateNow, 'dd/MM/yyyy');
  this.currentshowSecretery.numApply = this.arrayApply[i].id;
  this.currentshowSecretery.nameFillApply = this.arrayApply[i].employees?.idUserNavigation?.firstName;
  this.currentshowSecretery.levelUrgency = this.arrayApply[i].levelUrgency;
this.currentshowSecretery.apply=this.arrayApply[i];
  this.getStatusApply(this.currentshowSecretery.numApply,i);
  this.getPatientDetailsById(this.currentshowSecretery.numApply, i);
  this.arrayshowSecretery[i] = this.currentshowSecretery;
  this.currentshowSecretery = new showSecretery();
}
getPatientDetailsById(id: any, i: any) {
  this.patientDetailsService.getPatientDetailsByApplyId(id).subscribe(patientDetails => {
    this.currentPatientDetails = patientDetails;
    if (patientDetails != null) {
      // this.arrayshowSecretery[i].patientDetails=patientDetails;
      if (patientDetails.user?.firstName != null)
        this.arrayshowSecretery[i].firstName = "" + this.currentPatientDetails.user?.firstName;
      if (patientDetails.user?.lastName != null)
        this.arrayshowSecretery[i].lastName = "" + this.currentPatientDetails.user?.lastName;
    }
    // this.arrayshowSecretery[i]=this.currentshowSecretery;
    this.arrayPatientDetaild[i] = this.currentPatientDetails;
    console.log(patientDetails);
    console.log(this.arrayPatientDetaild);

  },
    err => { console.log("error") });

}

showTreatmentDetails(numApply: any) {
  this.myRouter.navigate(['/showDetailsApply/' + numApply]);
}
deleteApply(item:any){
  this.applyService.deleteApply(item.numApply).subscribe(deleatApply=>{
   this.return();
      },
      err=>{console.log("error")}); 
}
return () {
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
}
