import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apply } from 'src/app/Classes/Apply';
import { ApplyService } from 'src/app/Services/apply.service';

@Component({
  selector: 'app-awaiting-classification',
  templateUrl: './awaiting-classification.component.html',
  styleUrls: ['./awaiting-classification.component.scss']
})
export class AwaitingClassificationComponent implements OnInit {

  constructor(private applyService:ApplyService,
              private myRouter: Router) { }
  applyListFromIntake:Apply[]=[];
  ngOnInit(): void {
    this.applyService.GetAllApplyByStatus(2).subscribe(arrayApply=>{
      
      this.applyListFromIntake=arrayApply;
    },
    err=>{console.log("error")});
  }
  sivoug(id:any){
    this.myRouter.navigate(['/newTratmentDetailsManager/' + id]);

  }

}
