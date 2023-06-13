import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apply } from 'src/app/Classes/Apply';
import { CauseReferral } from 'src/app/Classes/CauseReferral';
import { DetailsAsker } from 'src/app/Classes/DetailsAsker';
import { Employee } from 'src/app/Classes/Employee';
import { Files } from 'src/app/Classes/Files';
import { MatureCharacter } from 'src/app/Classes/MatureCharacter';
import { PatientDetails } from 'src/app/Classes/PatientDetails';
import { TreatmentDetails } from 'src/app/Classes/TreatmentDetails';
import { User } from 'src/app/Classes/User';
import { ApplyService } from 'src/app/Services/apply.service';
import { DetailsAskerService } from 'src/app/Services/details-asker.service';
import { EmployeeService } from 'src/app/Services/employee.service';
import { MatureCharacterService } from 'src/app/Services/mature-character.service';
import { PatientDetailsService } from 'src/app/Services/patient-details.service';
import { TheCauseReferralService } from 'src/app/Services/the-cause-referral.service';
import { TreatmentDetailsService } from 'src/app/Services/treatment-details.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-details-applicants',
  templateUrl: './details-applicants.component.html',
  styleUrls: ['./details-applicants.component.scss']
})
export class DetailsApplicantsComponent implements OnInit {

  constructor(private applyService:ApplyService,
    private employeeService: EmployeeService,
    private userService:UserService,
    private patientDetailsService:PatientDetailsService,
    private detailsAskerService:DetailsAskerService,
    private theCauseReferralService:TheCauseReferralService,
    private formBuilder: FormBuilder,
    private matureCharacterService:MatureCharacterService,
    private treatmentDetailsService:TreatmentDetailsService,
    private route: ActivatedRoute,
    private renderer: Renderer2 ,
    private myRouter:Router
    ) { }
    color: ThemePalette = "primary";
    form!: FormGroup;
    arrayReferral=[
      { id: 1, name: "הפונה" },
      { id: 2, name: "בן/בת" },
      { id: 3, name: "אח/אחות" },
      { id: 4, name: "תלמיד/ה" },
      { id: 5, name: "אחר" }
    ];
newDetailsAsker:DetailsAsker=new DetailsAsker();
newPatientDetails:PatientDetails=new PatientDetails();


currentApply:Apply=new Apply();

selectedValueR:string="";
isAnotherR?:boolean;
anotherR?:string;
// referredBy:string="";
// applyCaused:any;
// detailsApplyCaused:string="";
// newCauseReferralToUpdate:CauseReferral=new CauseReferral();
newFile:Files=new Files();
selectedOptionTipul:string="";
isTipul?:boolean;
userMetapel:User=new User();
userMetapelC:User=new User();
isMatureCaracter?:boolean;
selectIsMatureCaracter:string="";
matureCharacter:MatureCharacter=new MatureCharacter();
permissionContact:string="";
therapeuticId?: number;
selectIsStillTerapist:string="";
newTreatmentDetails:TreatmentDetails=new TreatmentDetails();
numApply:any;
currentPatientDetailsByApplyId:PatientDetails= new PatientDetails();
currentDetailsAsker:DetailsAsker=new DetailsAsker();
currentEmployees:Employee=new Employee();
selectedValueRO:string="";
  ngOnInit(): void {
    this.isTipul=false;
    this.isMatureCaracter=false;
let applyId=sessionStorage.getItem('applyId')
if (applyId !== null) {
  this.numApply = +applyId;

}
let detailsAsker= sessionStorage.getItem('detailsAsker')
if(detailsAsker!=null){
  this.newDetailsAsker=JSON.parse(detailsAsker) as DetailsAsker;;
}
let data = sessionStorage.getItem('currentPatientDetails');
    if (data !== null) {
      this.newPatientDetails = JSON.parse(data) as PatientDetails;
    }
    this.employeeService.getEmployee().subscribe(empL=>{
      this.currentEmployees=empL;
    },
    err=>{console.log("error")}); 
    this.form = this.formBuilder.group({
      hebrewLetters : [null, [Validators.required, Validators.pattern(`^[\u0590-\u05FF .,?!"':;_()\n-\]+$`)]],
      mobileNumber: [null, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],  
      hebrewLettersC : [null, [Validators.required, Validators.pattern(`^[\u0590-\u05FF .,?!"':;_()\n-\]+$`)]],
      mobileNumberC: [null, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],  
      hebrewLettersCM : [null, [Validators.required, Validators.pattern(`^[\u0590-\u05FF .,?!"':;_()\n-\]+$`)]],
      anotherReferral:[null, [Validators.required, Validators.pattern(`^[\u0590-\u05FF .,?!"':;_()\n-\]+$`)]],
     });
  }
  resizeTextarea(textarea:any) {
    this.renderer.setStyle(textarea, 'height', 'auto');
    this.renderer.setStyle(textarea, 'height', textarea.scrollHeight + 'px');
}
  getAnotherReferral(){
    if (this.form.get('anotherReferral')?.hasError('required')) {
      return '  שדה חובה   ';
    }
    return this.form.get('anotherReferral')?.hasError('pattern') ? '  אותיות עברית בלבד ' : '';
  }
  getErrorMessageHebrewLetters() {
    if (this.form.get('hebrewLetters')?.hasError('required')) {
      return '  שדה חובה   ';
    }
    return this.form.get('hebrewLetters')?.hasError('pattern') ? '  אותיות עברית בלבד ' : '';
  }
  getErrorMessageMobileNumber() {
    if (this.form.get('mobileNumber')?.hasError('required')) {
      return '  שדה חובה   ';
    }
    return this.form.get('mobileNumber')?.hasError('pattern') ? '  מספר טלפון שגוי   ' : '';
  }
  getErrorMessageHebrewLettersC() {
    if (this.form.get('hebrewLettersC')?.hasError('required')) {
      return '  שדה חובה   ';
    }
    return this.form.get('hebrewLettersC')?.hasError('pattern') ? '  אותיות עברית בלבד ' : '';
  }
  getErrorMessageMobileNumberC() {
    if (this.form.get('mobileNumberC')?.hasError('required')) {
      return '  שדה חובה   ';
    }
    return this.form.get('mobileNumberC')?.hasError('pattern') ? '  מספר טלפון שגוי   ' : '';
  }
  getErrorMessageHebrewLettersCM() {
    if (this.form.get('hebrewLettersC')?.hasError('required')) {
      return '  שדה חובה   ';
    }
    return this.form.get('hebrewLettersC')?.hasError('pattern') ? '  אותיות עברית בלבד ' : '';
  }
  onSelectedValueChange(value: any) {

    this.isAnotherR=false;
        if(value==5){
          this.isAnotherR=true;}
          else{
           this.newDetailsAsker.affinity= this.arrayReferral[value].name;
           sessionStorage.setItem("detailsAsker",JSON.stringify(this.newDetailsAsker));
          }
  }
  sendValue(value: any) {
    this.newDetailsAsker.affinity= value;
  sessionStorage.setItem("detailsAsker",JSON.stringify(this.newDetailsAsker));
  }

  sendValueReferredBy(){
    sessionStorage.setItem("detailsAsker",JSON.stringify(this.newDetailsAsker));
  }
  onChangeTipul(valuel: any){
    if(valuel==true){
              this.isTipul=true;
              this.newPatientDetails.isTherapeutic=true;
              this.updateSessionPatientDetails();
            }
      else if(valuel==false){
            this.isTipul=false;
            this.newPatientDetails.isTherapeutic=false;
            this.updateSessionPatientDetails();
           }
  }
  updateSessiontoTerapist(){
    sessionStorage.setItem("userTherapist",JSON.stringify(this.userMetapel));
  }
  updateSessionPatientDetails(){
    sessionStorage.setItem("currentPatientDetails",JSON.stringify(this.newPatientDetails));
  }
  onChangeStillTipul(valuel: any){
    if(valuel==true){
      this.newPatientDetails.isStillTerapist=true;
     this.updateSessionPatientDetails();
    }
    else if(valuel==false){
    this.newPatientDetails.isStillTerapist=false;
    this.updateSessionPatientDetails();

   }
  }

  onChangeIsMatureCharacter(valuel: any){
    
    if(valuel=="true"){
      this.isMatureCaracter=true;
      this.newPatientDetails.isMatureCharacter=true;
      this.updateSessionPatientDetails();
    }
else if(valuel=="false"){
    this.isMatureCaracter=false;
    this.newPatientDetails.isMatureCharacter=false;
    this.updateSessionPatientDetails();
   }
}
  onChangePermissionContact(valuel: any){
    if(valuel=="true"){
      this.matureCharacter.permissionContact=true;
      this.updateSessiontoCharacter();
    }
    else if(valuel=="false"){
    this.matureCharacter.permissionContact=false;
    this.updateSessiontoCharacter();
   }
  }
updateSessiontoCharacter(){
  sessionStorage.setItem("matureCharacter",JSON.stringify(this.matureCharacter));
}
updateUserMetapelC(){
  sessionStorage.setItem("userMetapelC",JSON.stringify(this.userMetapelC));
}



//////////////////////////////////////////////
//   onChangeIsContact(valuel: any){
//     if(valuel=="כן"){
//       this.currentPatientDetailsByApplyId.isContact="כן";
//     }
// else if(valuel=="לא"){
//     this.currentPatientDetailsByApplyId.isContact="לא";
//    }
//    else if(valuel=="נעדכן בהמשך"){
//     this.currentPatientDetailsByApplyId.isContact="נעדכן בהמשך";
//    }
//   }
  ///////////////////////
  
  next(){
    if(this.isTipul)
      this.saveDetailsNewTerapist();
    else if(this.isMatureCaracter)
      this.saveDetailsNewTerapistMature();
      else
      this.updatePatientDetails();
    }
  saveDetailsNewTerapist(){
 //שליחת פרטי מטפל והוספת יוזר חדש
 this.userService.AddUser(this.userMetapel).subscribe(terapist=>{
 this.currentPatientDetailsByApplyId.therapeuticId=terapist;
  if(this.isMatureCaracter)
 this.saveDetailsNewTerapistMature();
},
err=>{console.log("error")});  
  }
  saveDetailsNewTerapistMature(){
    //שליחת פרטי החונך והוספת יוזר חדש
    this.userService.AddUser(this.userMetapelC).subscribe(terapist=>{
    this.matureCharacter.idMature=terapist;
    this.addNewMature();
   },
   err=>{console.log("error")});  
     }
     addNewMature(){
      this.matureCharacter.idApplicant=this.numApply;
      this.matureCharacterService.AddMatureCharacter(this.matureCharacter).subscribe(mature=>{
        this.matureCharacter.id=mature;
        this.currentPatientDetailsByApplyId.matureCharacterId=mature;
        this.updatePatientDetails();
       },
       err=>{console.log("error")});
     }
     updatePatientDetails(){
      this.currentPatientDetailsByApplyId.idDetailsAsker=this.currentDetailsAsker.id;
      // this.newPatientDetails.userId=this.currentPatientDetailsByApplyId.userId;
      // this.newPatientDetails.gender=this.currentPatientDetailsByApplyId.gender;
      // this.newPatientDetails.yearBorn=this.currentPatientDetailsByApplyId.yearBorn;
      // this.newPatientDetails.mounth=this.currentPatientDetailsByApplyId.mounth;
      // this.newPatientDetails.sectorId=this.currentPatientDetailsByApplyId.sectorId;
      // this.newPatientDetails.familyId=this.currentPatientDetailsByApplyId.familyId;
      // this.newPatientDetails.familyPlace=this.currentPatientDetailsByApplyId.familyPlace;
      // this.newPatientDetails.addressId=this.currentPatientDetailsByApplyId.addressId;
      // this.newPatientDetails.isInstition=this.currentPatientDetailsByApplyId.isInstition;
      // this.newPatientDetails.isMatureCharacter=this.currentPatientDetailsByApplyId.isMatureCharacter;
      // this.newPatientDetails.isTherapeutic=this.currentPatientDetailsByApplyId.isTherapeutic;
      // this.newPatientDetails.isContact=this.currentPatientDetailsByApplyId.isContact;
      // this.newPatientDetails.id=this.currentPatientDetailsByApplyId.id;
      // this.newPatientDetails.therapeuticId=this.currentPatientDetailsByApplyId.therapeuticId;
      // this.newPatientDetails.isStillTerapist=this.currentPatientDetailsByApplyId.isStillTerapist;
      // this.newPatientDetails.applyId=this.currentPatientDetailsByApplyId.applyId;
      // this.newPatientDetails.matureCharacterId=this.currentPatientDetailsByApplyId.matureCharacterId;
      // this.newPatientDetails.dateNow=this.currentPatientDetailsByApplyId.dateNow;
      // this.newPatientDetails.idDetailsAsker=this.currentPatientDetailsByApplyId.idDetailsAsker;
      // this.newPatientDetails.fillEmloyeesId=this.currentPatientDetailsByApplyId.fillEmloyeesId;

      this.patientDetailsService.UpdatePatientDetails(this.currentPatientDetailsByApplyId.id,this.newPatientDetails).subscribe(patientDetails=>{
        console.log(patientDetails);
        this.updateAskerDetails();
      },
      err=>{console.log("error")}); 
    }
    updateAskerDetails(){
      this.detailsAskerService.UpdateDetailsAsker(this.currentDetailsAsker.id,this.currentDetailsAsker).subscribe(detailsAsker=>{
        console.log(detailsAsker);
        this.addTreatment();
      },
      err=>{console.log("error")}); 
    }
    saveNow(){
      }
      addTreatment(){
    //הוספת שלב ביצוע  לסיווג מנהלי
        this.newTreatmentDetails.applyId=this.numApply;
        this.newTreatmentDetails.therapistId=this.currentEmployees.id;
        this.newTreatmentDetails.dateNow=new Date();
          this.newTreatmentDetails.taskId=8;
          this.newTreatmentDetails.statusId=2;
           this.treatmentDetailsService.AddTreatmentDetails(this.newTreatmentDetails).subscribe(result=>{
            console.log(result);
            this.return();
          },
          err=>{console.log("error")}); 
      }
      return(){
        if(this.currentEmployees.job?.details=="מנהל פניות          "){
          this.myRouter.navigate(['/manager']);
        }
         else if(this.currentEmployees.job?.details=="מזכיר               ")
       this.myRouter.navigate(['/navigateSecretary']);
         else if(this.currentEmployees.job?.details=="אינטייק             ")
       this.myRouter.navigate(['/inTakeNav']);
     }
    }
    

