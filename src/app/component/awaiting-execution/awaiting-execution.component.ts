import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/Classes/Employee';
import { PatientApply } from 'src/app/Classes/PatientApply';
import { TreatmentDetails } from 'src/app/Classes/TreatmentDetails';
import { ApplyService } from 'src/app/Services/apply.service';
import { EmployeeService } from 'src/app/Services/employee.service';
import { TreatmentDetailsService } from 'src/app/Services/treatment-details.service';

@Component({
  selector: 'app-awaiting-execution',
  templateUrl: './awaiting-execution.component.html',
  styleUrls: ['./awaiting-execution.component.scss']
})
export class AwaitingExecutionComponent implements OnInit {

  constructor(private applyService:ApplyService,
    private employeeService: EmployeeService,
    private myRouter:Router,
    private treatmentDetailsService:TreatmentDetailsService) { }
    currentEmplo:Employee=new Employee();
    applyList: any;
    nameEmployee:any;
   listTreatmentDetails:TreatmentDetails[]=[];
   lstApply:PatientApply[]=[];
   currentL:PatientApply=new PatientApply();
  ngOnInit(): void {
    
    this.employeeService.getEmployee().subscribe(empL=>{
      this.nameEmployee=empL?.idUserNavigation?.firstName;
      this.currentEmplo=empL;
      this.getApplyByEmpStatus();
    },
    err=>{console.log("error")}); 

     
  }
  getApplyByEmpStatus(){

    this.applyService.getAllAppliesByStatusEmailTerapist(this.currentEmplo.id,3).subscribe(arrayApply=>{
      this.applyList=arrayApply;
      if(arrayApply.length>0){
        for (let index = 0; index < arrayApply.length; index++) {
          this.lstApply.push(this.currentL);
          this.lstApply[index].apply=this.applyList[index];
          this.currentL=new PatientApply();
        }
      }
      //this.getAllTraetmentDetails(this.applyList);
      this.getAllTraetmentDetails(this.applyList);
    },
    err=>{console.log("error")});
  }
  getAllTraetmentDetails(arrApply:any){
    
    for(let i=0; i<arrApply.length;i++){
      this.addTreatment(arrApply[i].id,i);
    }

  }
  addTreatment(id:any,i:any){
    this.treatmentDetailsService.GetTreatmentDetailsByApplyState(id).subscribe(newTreatmentDetails=>{
  this.lstApply[i].treatment=newTreatmentDetails;
    },
    err=>{console.log("error")}); 
  }
  addTreatmentDetails(item:any){
    if(item!=null){
      this.myRouter.navigate(['/showDetailsApply/'+item.apply?.id]);
    }
    else alert("לחצתם על פניה לא קיימת")

  }
  return () {
    if (this.currentEmplo.job?.id == 1) {
      this.myRouter.navigate(['/manager']);
    }
    else if (this.currentEmplo.job?.id == 3)
      this.myRouter.navigate(['/navigateSecretary']);
    else if (this.currentEmplo.job?.id == 4)
      this.myRouter.navigate(['/inTakeNav']);
      else if (this.currentEmplo.job?.id ==5)
      this.myRouter.navigate(['/navigatePatient']);
  }

}
