import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/Classes/Employee';
import { Tasks } from 'src/app/Classes/Tasks';
import { TreatmentDetails } from 'src/app/Classes/TreatmentDetails';
import { EmployeeService } from 'src/app/Services/employee.service';
import { TaskService } from 'src/app/Services/task.service';
import { TreatmentDetailsService } from 'src/app/Services/treatment-details.service';

@Component({
  selector: 'app-new-tratment-details-manager',
  templateUrl: './new-tratment-details-manager.component.html',
  styleUrls: ['./new-tratment-details-manager.component.scss']
})
export class NewTratmentDetailsManagerComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private taskService:TaskService,
     private renderer: Renderer2,
     private route: ActivatedRoute,
     private treatmentDetailsService:TreatmentDetailsService,
     private myRouter: Router) { }

     form=new FormGroup({
      selectTask: new FormControl('', Validators.required),
      selectNextTask: new FormControl('', Validators.required),
      hebrewLetters : new FormControl('', [Validators.required, Validators.pattern(`^[\u0590-\u05FF .,?!"':;_()\n-\]+$`)]),
      date :new FormControl(new Date(), [Validators.required]),
      selectNextTaskIsEmplo:new FormControl('', Validators.required),
    
    });
    newTreatmentDedails:TreatmentDetails=new TreatmentDetails();
     isClick:boolean=true;
    dateNow:Date=new Date();
    emp:any;
    nameFill:string="";
    arrayTasks:Tasks[]=[];
    selectedValueT:string="";
    selectTaskN:string="";
    modalPresentation:string="";
    isOkDate:boolean=true;
    isOkDateEmp:boolean=true;
    isEmplo:boolean=false;
    arrayEmplo:Employee[]=[];
    isDetails:boolean=false;
    employeesId:string="";
    isClickP:boolean=false;
    isClickAddTreat:boolean=false;
      ngOnInit(): void {
        this.route.params.subscribe(params => {
          const id = +params['id'];
          this.newTreatmentDedails.applyId=id ;
        });
        
        this.employeeService.getEmployee().subscribe(empL=>{
          this.emp=empL;
          this.nameFill=this.emp?.idUserNavigation?.firstName;
          this.newTreatmentDedails.therapistId=this.emp.id;
        },
        err=>{console.log("error")}); 
        this.employeeService.GetAllEmployees().subscribe(emplo=>{
          this.arrayEmplo=emplo;
        },
        err=>{console.log("error")});
        /////////////
        this.taskService.getAllTasks().subscribe(tasks=>{
          this.arrayTasks=tasks;
        },
        err=>{console.log("error")});
        // this.newTreatmentDedails.documentation="חדש"
        this.newTreatmentDedails.taskId=1013;
      }
       
      getErrorMessageHebrewLetters() {
        if (this.form.get('hebrewLetters')?.hasError('required')) {
          return '  שדה חובה   ';
        }
        return this.form.get('hebrewLetters')?.hasError('pattern') ? '  אותיות עברית בלבד ' : '';
      }
    
      getErrorSelectTask() {
        if (this.form.get('selectTask')?.hasError('required')) {
          return '  שדה חובה   ';
        }
        return this.form.get('selectTask')?.hasError('pattern') ? '' : '';
      }
     getErrorSelectNextTaskIsEmplo(){
      if (this.form.get('selectNextTaskIsEmplo')?.hasError('required')) {
        return '  שדה חובה   ';
      }
      return this.form.get('selectNextTaskIsEmplo')?.hasError('pattern') ? '' : '';
     }
      getErrorMessageDateControl() {
        if (this.form.get('date')?.hasError('required')) {
          return '  שדה חובה   ';
        }
        return this.form.get('date')?.hasError('pattern') ? ' ' : '';
      }
     
      resizeTextarea(textarea:any) {
        this.renderer.setStyle(textarea, 'height', 'auto');
        this.renderer.setStyle(textarea, 'height', textarea.scrollHeight + 'px');
    }
    
    
    //במידה ומוצג רשימת הפעילים 
    selectIsEmplo(){
    
    }
    //ביצוע שלב הבא
    onSelectedValueChange(){
      this.isEmplo=false;
      this.isDetails=false;
      //בירור נוסף/ יעוץ מערכת
      if(this.form.get('selectNextTask')?.value==1||this.form.get('selectNextTask')?.value==5)
     //משימת מזכיר
     if(this.form.get('selectNextTask')?.value==6)
     this.isDetails=true;
    }
    
    onSubmit(){
      if(this.employeesId!=""){
      this.newTreatmentDedails.nextEmployeesId=this.arrayEmplo.find(e=>e.idUserNavigation?.firstName==this.employeesId)?.id;
      this.newTreatmentDedails.statusId=7;
    }
    else{
      this.newTreatmentDedails.nextEmployeesId=this.emp.id;
      this.newTreatmentDedails.statusId=4;
    }
        this.newTreatmentDedails.dateNow=new Date();
        this.newTreatmentDedails.taskId=parseInt(""+this.newTreatmentDedails.taskId);
        this.newTreatmentDedails.nextStepId=parseInt(""+this.newTreatmentDedails.nextStepId);
        this.newTreatmentDedails.nextDocumentation=this.form.get('hebrewLettersDetailsTask')?.value;
    this.treatmentDetailsService.AddTreatmentDetails(this.newTreatmentDedails).subscribe(result=>{
      if (this.emp.job?.id == 1) {
        this.myRouter.navigate(['/manager']);
      }
      else if (this.emp.job?.id == 3)
        this.myRouter.navigate(['/navigateSecretary']);
      else if (this.emp.job?.id == 4)
        this.myRouter.navigate(['/inTakeNav']);
        else if (this.emp.job?.id ==5)
        this.myRouter.navigate(['/navigatePatient']);
    },
    err=>{console.log("error")}); 
    }
    return () {
      if (this.emp.job?.id == 1) {
        this.myRouter.navigate(['/manager']);
      }
      else if (this.emp.job?.id == 3)
        this.myRouter.navigate(['/navigateSecretary']);
      else if (this.emp.job?.id == 4)
        this.myRouter.navigate(['/inTakeNav']);
        else if (this.emp.job?.id ==5)
        this.myRouter.navigate(['/navigatePatient']);
    }

}
