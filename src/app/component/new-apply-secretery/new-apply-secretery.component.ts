import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Apply } from 'src/app/Classes/Apply';
import { CauseReferral } from 'src/app/Classes/CauseReferral';
import { TheCauseReferralService } from 'src/app/Services/the-cause-referral.service';
import { ApplyService } from 'src/app/Services/apply.service';
import { EmployeeService } from 'src/app/Services/employee.service';
import { User } from 'src/app/Classes/User';
import { UserService } from 'src/app/Services/user.service';
import { TreatmentDetailsService } from 'src/app/Services/treatment-details.service';
import { TreatmentDetails } from 'src/app/Classes/TreatmentDetails';
import { DetailsAsker } from 'src/app/Classes/DetailsAsker';
import { DetailsAskerService } from 'src/app/Services/details-asker.service';
import { Router } from '@angular/router';
import { Employee } from 'src/app/Classes/Employee';
import { DatePipe, Location } from '@angular/common'
import { PatientApply } from 'src/app/Classes/PatientApply';
import { PatientDetailsService } from 'src/app/Services/patient-details.service';
@Component({
  selector: 'app-new-apply-secretery',
  templateUrl: './new-apply-secretery.component.html',
  styleUrls: ['./new-apply-secretery.component.scss']
})
export class NewApplySecreteryComponent implements OnInit {
  arrayLevelUrgency = [
    { id: 1, name: "VIP" },
    { id: 2, name: "דחוף" },
    { id: 3, name: "רגיל" }
  ];
  arrayReferral = [
    { id: 1, name: "פונה עבור עצמו" },
    { id: 2, name: "הורים" },
    { id: 3, name: "אח/אחות" },
    { id: 4, name: "חונך/רב" },
    { id: 5, name: "אחר" }
  ];
  form!: FormGroup;
  newApply: Apply = new Apply();
  selectedValueR: string = "";

  userAsker: User = new User();
  nameEmployee: any;
  currentEmplo: any;
  nameApply: string = "";
  phoneAsker: string = "";
  applyPhone: Apply[] = [];
  arrayApply: PatientApply[] = [];
  isSendToManager!: boolean;
  idUserAsker!: number;
  isAddUser: any;
  isAddApply: any;
  isUpdateApply: any;
  idApply: any;
  selectedValue: string = "";
  userAskerFromApi: User = new User();
  arrayCauseReferral: CauseReferral[] = [];
  currentCauseReferral: CauseReferral = new CauseReferral();
  newTreatmentDetails: TreatmentDetails = new TreatmentDetails();
  isAddTreatmentDetails: any;
  newDetailsAsker: DetailsAsker = new DetailsAsker();
  isAnotherCause: boolean = false;
  newApplyListA: PatientApply[] = [];
  currentA: PatientApply = new PatientApply();
  newApplyList: PatientApply[] = [];
  isOk: boolean = false;
  isAnotherR: boolean = false;
  selectedValueRO: string = "";
  constructor(private formBuilder: FormBuilder,
    private CauseReferralService: TheCauseReferralService,
    private ApplyService: ApplyService,
    private employeeService: EmployeeService,
    private userService: UserService,
    private treatmentDetailsService: TreatmentDetailsService,
    private detailsAskerService: DetailsAskerService,
    private patientDetailsService: PatientDetailsService,
    private myRouter: Router,
    private location: Location,
    private datePipe: DatePipe
  ) { }
  searchText: string = "";
  zman: string = "";
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
          if (d.getHours() >= 22 && d.getHours() < 24 || d.getHours() >= 0 && d.getHours() <= 6)
            this.zman = "לילה טוב לך ";
    this.employeeService.getEmployee().subscribe(empL => {
      this.nameEmployee = empL?.idUserNavigation?.firstName;
      this.currentEmplo = empL;
    },
      err => { console.log("error") });

    this.isSendToManager = false;
    this.CauseReferralService.GetAllTheCauseReferral().subscribe(arrayCauseReferral => {
      this.arrayCauseReferral = arrayCauseReferral;
      console.log(this.arrayCauseReferral);
    },
      err => { console.log("error") });

    this.form = this.formBuilder.group({
      hebrewLetters: [null, [Validators.required, Validators.pattern(`^[\u0590-\u05FF .,?!"':;_()-\]+$`)]],
      mobileNumber: [null, [Validators.required, Validators.pattern(/^\+?([0-9]{1,4})?[-. (]*([0-9]{1,3})[-. )]*([0-9]{1,4})[-. ]*([0-9]{1,4})[-. ]*([0-9]{1,9})$/)]],
      selectedValueControl: [""],
      selectedValueControlLevelUrgency: [""],
      valueDetailsAnotherCause: [""],
      affinity: ['', Validators.required],
      refferalB: ['', Validators.required],
      affinityO: [''],
    });
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
  onSelectedValueChangeR(value: any) {
    if (value == "") {
      return;
    }
    else {
      this.isAnotherR = false;
      if (value == "אחר") {
        this.isAnotherR = true;
      }
      else {
        this.newDetailsAsker.affinity = this.arrayReferral[value].name;
      }
    }
  }
  sendValueB(value: any) {
    this.newDetailsAsker.affinity = value;
  }
  onSelectedValueChange() {
    this.isAnotherCause = false;
    console.log(this.form.get('selectedValueControl')?.value);
    for (let index = 0; index < this.arrayCauseReferral.length; index++) {
      if (this.arrayCauseReferral[index].descreption == this.form.get('selectedValueControl')?.value) {
        this.currentCauseReferral = this.arrayCauseReferral[index];
        this.newDetailsAsker.idResone = this.arrayCauseReferral[index].id;
        if (this.form.get('selectedValueControl')?.value == "שונות               ") {
          this.isAnotherCause = true;
        }
        break;
      }
    }
  }
  onSelectedValueChangeLevelUrgency() {

    console.log(this.form.get('selectedValueControlLevelUrgency')?.value);

    for (let index = 0; index < this.arrayLevelUrgency.length; index++) {
      if (this.arrayLevelUrgency[index].name == this.form.get('selectedValueControlLevelUrgency')?.value) {
        this.newApply.levelUrgency = this.arrayLevelUrgency[index].name;
        break;
      }
    }
  }
  sendManager() {
    this.isSendToManager = true;
    this.sendIntake()
  }
  sendIntake() {
    debugger
    //הוספת פרטי הפונה
    this.addNewUser();
    //הוספת פניה חדשה לקונטרולר


  }

  addNewUser() {
    this.userAsker.firstName = this.nameApply;
    this.userAsker.phone = this.phoneAsker;
    //שליחת פרטי הפונה והוספת יוזר חדש
    this.userService.AddUser(this.userAsker).subscribe(asker => {
      this.idUserAsker = asker;
      this.newApply.askerId = asker;
      this.userAsker.id = asker;
      this.userService.userAskerFromApi = this.userAsker
      this.newDetailsAsker.userId = asker;
      this.addDetailAsker();
      this.addApply();
      //  this.return();
    },
      err => { console.log("error") });
  }
  addDetailAsker() {
    if (this.form.get('affinityO')?.value != "")
      this.newDetailsAsker.affinity = this.form.get('affinityO')?.value;
    else
      this.newDetailsAsker.affinity = this.form.get('affinity')?.value;
    this.detailsAskerService.AddDetailsAsker(this.newDetailsAsker).subscribe(result => {
      this.newDetailsAsker.id = result;
      // sessionStorage.setItem("detailsAsker", JSON.stringify(this.newDetailsAsker));
    },
      err => { console.log("error") });
  }
  addApply() {
    this.newApply.detailsAnotherCause = this.form.get('valueDetailsAnotherCause')?.value;
    this.newApply.dateNow = new Date();
    this.newApply.employeesId = this.currentEmplo.id;
    this.newApply.askerId = this.idUserAsker;
    this.newApply.applyCausedId = this.currentCauseReferral.id;
    this.newApply.isActive=true;
    this.ApplyService.AddApply(this.newApply).subscribe(AddApply => {
      sessionStorage.setItem("applyId", JSON.stringify(AddApply));
      this.idApply = AddApply;
      this.newApply.id = AddApply;
      this.addTreatment()
    },
      err => { console.log("error") });

  }

  addTreatment() {
    this.newTreatmentDetails.applyId = this.newApply.id;
    this.newTreatmentDetails.therapistId = this.newApply.employeesId;
    this.newTreatmentDetails.dateNow = new Date();
    this.newTreatmentDetails.dateTask = new Date();
    /////////////////////////////////
    //  סטטוס -1 חדש ממזכיר למנהל
    //סטטוס 6-חדש ממזכיר לאינטייק
    //טסק -8 סיווג מנהלי
    ///////////////////////////////////
    if (this.isSendToManager == true) {
      this.newTreatmentDetails.taskId = 13;
      this.newTreatmentDetails.statusId = 1;
    }
    else {
      this.newTreatmentDetails.taskId = 13;
      this.newTreatmentDetails.statusId = 6;
    }

    this.treatmentDetailsService.AddTreatmentDetails(this.newTreatmentDetails).subscribe(result => {
      this.returnH();
    },
      err => { console.log("error") });
    this.isSendToManager = false;

  }
  returnH() {
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
  showTreatmentDetails(numApply: any) {
    this.myRouter.navigate(['/showDetailsApply/' + numApply + '/' + true + '/' + true]);
  }
  return() {
    this.location.back();

  }
}



