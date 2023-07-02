import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/Classes/Employee';
import { TreatmentDetails } from 'src/app/Classes/TreatmentDetails';
import { EmployeeService } from 'src/app/Services/employee.service';
import { TreatmentDetailsService } from 'src/app/Services/treatment-details.service';
import { Location } from '@angular/common'
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-show-details-apply',
  templateUrl: './show-details-apply.component.html',
  styleUrls: ['./show-details-apply.component.scss']
})
export class ShowDetailsApplyComponent implements OnInit {


  constructor(private treatmentDetailsService: TreatmentDetailsService,
    private route: ActivatedRoute,
    private myRouter: Router,
    private employeeService: EmployeeService,
    private location: Location,
    public dialog: MatDialog
  ) { }
  isClick: boolean = false;
  isClickS: boolean = false;
  isClickPP: boolean = false;
  arrayTreatmentDetails: TreatmentDetails[] = [];
  currentNumApply?: number;
  item: TreatmentDetails = new TreatmentDetails();
  isClickAddTreatment: boolean = false;
  IsUpdate:boolean=false;
  currentEmployees: Employee = new Employee();
  localTime: any;
  sivoug: boolean = false;
  IsSec: boolean = false;
  chooseItem: TreatmentDetails = new TreatmentDetails();
  ngOnInit(): void {
    this.IsUpdate=false;
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.currentNumApply = id;
      this.sivoug = params['sivoug'] === 'true';
      this.IsSec = params['isSec'] === 'true';
    });

    this.employeeService.getEmployee().subscribe(empL => {
      this.currentEmployees = empL;
    },
      err => { console.log("error") });

    this.treatmentDetailsService.GetAllTreatmentDetails(this.currentNumApply).
      subscribe(allTreatmentDetails => {
        this.arrayTreatmentDetails = allTreatmentDetails;

      },
        err => { console.log("error") });


    this.treatmentDetailsService.GetTreatmentDetailsByApplyState(this.currentNumApply).subscribe(newTreatmentDetails => {
      this.item = newTreatmentDetails;
    },
      err => { console.log("error") });

  }
  openDeleteDialog(item:any) {
   const dialogRef=this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      result.delete && this.deleteTreatmentDetails(item.id,item.statusId);
    });
    
  }
  updateIns(item: any){
this.IsUpdate=!this.IsUpdate;

  }
  deleteTreatmentDetails(id:any,status:any) {
    this.sivoug=false;
     this.isClickAddTreatment=false;
    if(status==7){
      alert(" יש להזין שנית-לא ניתן למחוק שלב טיפול זה");
      this.treatmentDetailsService.deleteTreatmentDetails(id,this.currentNumApply).subscribe(emp => {
        this.treatmentDetailsService.GetTreatmentDetailsByApplyState(this.currentNumApply).subscribe(newTreatmentDetails => {
          this.item = newTreatmentDetails;
        },
          err => { console.log("error") });
      this.sivoug=true;
     this.isClickAddTreatment=true;}, 
     err => { console.log("error") });
    }
    else{
      this.treatmentDetailsService.deleteTreatmentDetails(id,this.currentNumApply).subscribe(emp => {
        if(emp==false)
        alert("לא ניתן למחוק שלב טיפול זה");
        this.treatmentDetailsService.GetAllTreatmentDetails(this.currentNumApply).subscribe(allTreatmentDetails => {
          this.arrayTreatmentDetails = allTreatmentDetails;
        }, err => { console.log("error") });


      }, err => { console.log("error") });}
  }
  isClickAddTreatmentF() {
    // if(this.isClickAddTreatment)
    // alert("הוספת שלב הטיפול לא הושלמה במלואה") ;

    this.isClickAddTreatment = !this.isClickAddTreatment;

  }
  return() {
    this.location.back();
  }

}
