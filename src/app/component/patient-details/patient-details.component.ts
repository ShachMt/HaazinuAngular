import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apply } from 'src/app/Classes/Apply';
import { DetailsAsker } from 'src/app/Classes/DetailsAsker';
import { EducationalInstitutionsApplicant } from 'src/app/Classes/EducationalInstitutionsApplicant';
import { Employee } from 'src/app/Classes/Employee';
import { PatientDetails } from 'src/app/Classes/PatientDetails';
import { TreatmentDetails } from 'src/app/Classes/TreatmentDetails';
import { ApplyService } from 'src/app/Services/apply.service';
import { DetailsAskerService } from 'src/app/Services/details-asker.service';
import { EducationalInstitutionsApplicantService } from 'src/app/Services/educational-institutions-applicant.service';
import { EmployeeService } from 'src/app/Services/employee.service';
import { PatientDetailsService } from 'src/app/Services/patient-details.service';
import { TreatmentDetailsService } from 'src/app/Services/treatment-details.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.scss']
})
export class PatientDetailsComponent implements OnInit {

  constructor(private patientDetailsService: PatientDetailsService,
    private route: ActivatedRoute,
    private applyService: ApplyService,
    private educationalInstitutionsApplicantService: EducationalInstitutionsApplicantService,
    private detailsAskerService: DetailsAskerService,
    private renderer: Renderer2,
    private treatmentDetailsService: TreatmentDetailsService,
    private employeeService: EmployeeService,
    private myRouter: Router,
    public dialog: MatDialog
  ) { }
  idApply: any;
  currentPatientDetails: PatientDetails = new PatientDetails();
  affinity: string = "";
  self: string = "";
  yachas: string = "";
  currentApply: Apply = new Apply();
  isInstition: string = "";
  isInstitionPast: string = "";
  firstEdu: string = "";
  isTherapeutic: string = "";
  isStillTerapist: string = "";
  isMatureCharacter: string = "";
  permissionContact: string = "";
  isClickP: boolean = false;
  arrayCurrentInstitionPresent: EducationalInstitutionsApplicant[] = [];
  arrayCurrentInstitionPast: EducationalInstitutionsApplicant[] = [];
  newArrINsPast: EducationalInstitutionsApplicant[] = [];
  currentDetailsAsker: DetailsAsker = new DetailsAsker();
  isClickAddTreatment: boolean = true;
  newTreatmentDedails: TreatmentDetails = new TreatmentDetails();
  currentEmplorees: Employee = new Employee();
  arrEmployees: Employee[] = [];
  ageNow?: number;
  gender: string = "";
  stad: string = "";
  leave: string = "";
  isTherapeuticT: string = "";
  namePresentIns: string = "";
  isChange: boolean = false;
  lArr?: number;
  x: number = 0;
  isOpen: boolean = false;
  isClickAllTreatment: boolean = false;
  isClickTreatment: boolean = false;
  currentTreatment: TreatmentDetails = new TreatmentDetails();
  arrayTreatmentDetails: TreatmentDetails[] = [];

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idApply = +params['id'];
      this.applyService.getApplyById(this.idApply).subscribe(apply => {
        this.currentApply = apply;
        this.treatmentDetailsService.getTreatmentDetailsByApplyTask(this.idApply, 13).subscribe(t => {
          this.currentTreatment = t;
        },
          err => { console.log("error") });
        this.treatmentDetailsService.GetAllTreatmentDetails(this.idApply).
          subscribe(allTreatmentDetails => {
            this.arrayTreatmentDetails = allTreatmentDetails;
          },
            err => { console.log("error") });

        // this.getCurrentDetailsAsker(this.currentApply.askerId);
      },
        err => { console.log("error") });
    });

    this.employeeService.getEmployee().subscribe(empL => {
      this.currentEmplorees = empL;
    },
      err => { console.log("error") });
    this.employeeService.GetAllEmployees().subscribe(empL => {
      this.arrEmployees = empL;
    },
      err => { console.log("error") });
    this.patientDetailsService.getPatientDetailsByApplyId(this.idApply).subscribe(patientDetails => {
      this.currentPatientDetails = patientDetails;
      if (patientDetails != null) {
        if (this.currentPatientDetails.gender == "זכר") {
          this.stad = "למד";
          this.leave = "עזב";
          this.gender = "בן"
          this.yachas = "הוא"
          this.affinity = " הם הופנו להאזינו ע'י";
        debugger
          switch (patientDetails.idDetailsAskerNavigation?.affinity) {
            case "פונה עבור עצמו":
              this.affinity = " הוא הופנה להאזינו ע'י";
              this.self = "עצמו. "
              break;
              case "הורים":
                this.self = "בנו. "
              break;
              case "אח/אחות": 
              this.self = "אחיו. "
              break;
            case "חונך/רב":this.self = "תלמידו. "
              break;
          }
        }
        else if (this.currentPatientDetails.gender == "נקבה") {
          this.stad = "למדה";
          this.gender = "בת";
          this.yachas = "היא";
          this.leave = "עזבה";

          if (this.currentPatientDetails.idDetailsAskerNavigation?.affinity == "פונה עבור עצמו") {
            this.affinity = "  היא הופנתה להאזינו ע'י";
            this.self = "עצמה.";
          }
          switch (this.currentPatientDetails.idDetailsAskerNavigation?.affinity) {
            case "פונה עבור עצמו":
              this.affinity = " היא הופנתה להאזינו ע'י";
              this.self = "עצמה. "
              break;
              case "הורים":
                this.self = "בתם. "
              break;
              case "אח/אחות": 
              this.self = "אחותה. "
              break;
            case "חונך/רב":this.self = "תלמידתה. "
              break;
          }

        }
        if (this.currentPatientDetails.dateNow && this.currentPatientDetails.ageFillApply) {
          this.ageNow = new Date().getFullYear() - new Date(this.currentPatientDetails.dateNow).getFullYear() +
            this.currentPatientDetails.ageFillApply;
        }
debugger;
        //האם היה בתהליך טיפולי
        if (this.currentPatientDetails.isTherapeutic) {
          if (this.gender == "בן") {
            this.isTherapeuticT = "היה בעבר בתהליך טיפולי אצל: "
            this.isTherapeutic = this.currentPatientDetails.terapist?.idUserNavigation?.firstName + " " +
              this.currentPatientDetails.terapist?.idUserNavigation?.lastName + " טלפון: " +
               this.currentPatientDetails.terapist?.idUserNavigation?.phone + " תפקיד: "+ this.currentPatientDetails.terapist?.job;
          }
          else if (this.gender = "בת") {
            this.isTherapeuticT = "היתה בעבר בתהליך טיפולי אצל: "
            this.isTherapeutic = this.currentPatientDetails.terapist?.idUserNavigation?.firstName + " " +
              this.currentPatientDetails.terapist?.idUserNavigation?.lastName + " טלפון: " + this.currentPatientDetails.terapist?.idUserNavigation?.phone + " ";
          }
        }
        else {
          if (this.gender == "בן")
            this.isTherapeutic = "לא היה בעבר בתהליך טיפולי  "
          else if (this.gender = "בת")
            this.isTherapeutic = "לא היתה בעבר בתהליך טיפולי  "
        }
        //נמצא עדיין בתהליך טיפולי
        if (this.currentPatientDetails.isStillTerapist) {
          if (this.gender == "בן") {
            this.isStillTerapist = " מטופל אצל : ";
            if (this.currentPatientDetails.permissionContactTm ==false) {
              this.permissionContact = " לא מאפשרים לפנות אליו. "
            }
            else {
              this.permissionContact = " במידת הצורך מאפשרים לפנות אליו. "
            }
          }
          else if (this.gender = "בת") {
            this.isStillTerapist = " מטופלת אצל : " + this.currentPatientDetails.terapist?.idUserNavigation?.firstName + " " +
              this.currentPatientDetails.terapist?.idUserNavigation?.lastName + " " + this.currentPatientDetails.
              terapist?.idUserNavigation?.phone + " ";
            if (this.currentPatientDetails.permissionContactTm == false) {
              this.isStillTerapist += " לא מאפשרים לפנות  "
            }
            else {
              this.isStillTerapist += " במידת הצורך מאפשרים לפנות  "
            }
          }
        }
        else {
          if (this.gender == "בן") {
            this.isStillTerapist = "כיום לא נמצא בתהליך טיפולי";
          }
          else if (this.gender = "בת") {
            this.isStillTerapist = "כיום לא נמצאת בתהליך טיפולי";
          }
        }


        if (this.currentPatientDetails.isMatureCharacter) {
          this.isMatureCharacter = this.currentPatientDetails.matureCharacter?.idMatureNavigation?.firstName + " " +
            this.currentPatientDetails.matureCharacter?.idMatureNavigation?.lastName + " טלפון: " + this.currentPatientDetails.matureCharacter?.idMatureNavigation?.phone;

        }

        else
          this.isMatureCharacter = "";
        // this.currentPatientDetails.userId
        this.getIns(this.currentPatientDetails.user?.id);
      }
    },
      err => { console.log("error") });

  }
  updateIntake(){
    this.myRouter.navigate(['/fillNewApply/' + this.idApply]);

  }
  openDeleteDialog(item: any) {
    const dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      result.delete && this.deleteTreatmentDetails(item.id, item.statusId);
    });

  }
  deleteTreatmentDetails(id: any, status: any) {
    if (status == 7) {
      alert("לא ניתן למחוק שלב טיפול זה");
    }
    else {
      this.treatmentDetailsService.deleteTreatmentDetails(id, this.idApply).subscribe(emp => {
        if (emp == false)
          alert("לא ניתן למחוק שלב טיפול זה");
        this.treatmentDetailsService.GetAllTreatmentDetails(this.idApply).subscribe(allTreatmentDetails => {
          this.arrayTreatmentDetails = allTreatmentDetails;
        }, err => { console.log("error") });


      }, err => { console.log("error") });
    }
  }
  resizeTextarea(textarea: any) {
    this.renderer.setStyle(textarea, 'height', 'auto');
    this.renderer.setStyle(textarea, 'height', textarea.scrollHeight + 'px');
  }
  getCurrentDetailsAsker(askerId: any) {
    this.detailsAskerService.getDetailsAskerByUserAskerId(askerId).subscribe(asker => {
      this.currentDetailsAsker = asker;
      if (this.currentDetailsAsker.affinity == "הפונה") {
        if (this.currentPatientDetails.gender == "זכר") {
          this.affinity = " הוא הופנה להאזינו ע'י";
          this.self = "עצמו. "
        }
        else if (this.currentPatientDetails.gender == "נקבה") {
          this.affinity = "  היא הופנתה להאזינו ע'י";
          this.self = "עצמה.";
        }
      }
      else {
        this.self = "" + this.currentDetailsAsker.affinity
        this.affinity = " הם הופנו להאזינו ע'י " + this.currentDetailsAsker.referredBy;
      }
    },
      err => { console.log("error") });
  }
  getIns(idUser: any) {
    debugger
    if (this.currentPatientDetails.isInstition == true) {

      this.educationalInstitutionsApplicantService.getAllEducationalInstitutionByUserIdStatus(idUser, "הווה      ").subscribe(arrIns => {
        this.arrayCurrentInstitionPresent = arrIns;
        if (this.arrayCurrentInstitionPresent.length > 0) {
          this.namePresentIns = "" + this.arrayCurrentInstitionPresent[0].institution?.idCategoryNavigation?.detailsCategory;
          for (let index = 0; index < this.arrayCurrentInstitionPresent.length; index++) {
            if (this.gender == "בן")
              this.isInstition = " כיום לומד ב" + this.arrayCurrentInstitionPresent[index].institution?.idCategoryNavigation?.detailsCategory + "ב: "
                + this.arrayCurrentInstitionPresent[index].institution?.institutionName
                + "," + this.arrayCurrentInstitionPresent[index].institution?.enotherName + " ב: "
                + this.arrayCurrentInstitionPresent[index].details;
            else if (this.gender = "בת")
              this.isInstition = "כיום לומדת ב" + this.arrayCurrentInstitionPresent[index].institution?.idCategoryNavigation?.detailsCategory + "ב: "
                + this.arrayCurrentInstitionPresent[index].institution?.institutionName
                + "," + this.arrayCurrentInstitionPresent[index].institution?.enotherName + " ב: "
                + this.arrayCurrentInstitionPresent[index].details;
          }
        }
        else {
          if (this.gender == "בן")
            this.isInstition = "כיום לא נמצא במסגרת לימודית";
          else if (this.gender = "בת")
            this.isInstition = "כיום לא נמצאת במסגרת לימודית";
        }
        this.educationalInstitutionsApplicantService.getAllEducationalInstitutionByUserIdStatus(idUser, "עבר       ").subscribe(arrIns => {
          this.arrayCurrentInstitionPast = arrIns;

          if (this.arrayCurrentInstitionPast.length > 0) {
          
          }

          else
            this.isInstitionPast += "לא פורטו מוסדות לימודים קודמים"
        },
          err => { console.log("error") });



      },
        err => { console.log("error") });
    }

    // this.educationalInstitutionsApplicantService.getAllEducationalInstitutionByUserIdStatus(idUser, "עבר       ").subscribe(arrIns => {
    //   this.arrayCurrentInstitionPast = arrIns;
    //   if (this.arrayCurrentInstitionPast.length > 0) {
    //     for (let i = 0; i < this.arrayCurrentInstitionPast.length; i++) {
    //       if (i > 0) {
    //         if (this.arrayCurrentInstitionPast[i].institution?.idCategoryNavigation?.detailsCategory == this.arrayCurrentInstitionPast[i - 1].institution?.idCategoryNavigation?.detailsCategory)
    //           this.isInstitionPast += " ולאחר מכן עבר ל: " + this.arrayCurrentInstitionPast[i].institution?.institutionName + "," +
    //             this.arrayCurrentInstitionPast[i].institution?.enotherName + " " +
    //             "  ו : " + this.arrayCurrentInstitionPast[i].details;
    //         else
    //           this.isInstitionPast += "ב" + this.arrayCurrentInstitionPast[i].institution?.idCategoryNavigation?.detailsCategory + "למד ב" +
    //             this.arrayCurrentInstitionPast[i].institution?.institutionName + "," +
    //             this.arrayCurrentInstitionPast[i].institution?.enotherName + " " +
    //             "  ו : " + this.arrayCurrentInstitionPast[i].details;
    //       }
    //       else {
    //         this.isInstitionPast += "\n ב : " + this.arrayCurrentInstitionPast[i].institution?.idCategoryNavigation?.detailsCategory + " למד ב: " +
    //           this.arrayCurrentInstitionPast[i].institution?.institutionName + "," +
    //           this.arrayCurrentInstitionPast[i].institution?.enotherName + " " +
    //           "  ו : " + this.arrayCurrentInstitionPast[i].details;
    //       }
    //     }
    //   }
    //   else
    //     this.isInstitionPast += "לא פורטו מוסדות לימודים קודמים."
    // },
    //   err => { console.log("error") });
  }

  repeatCategory() {
    this.isInstitionPast = "";
    if (this.gender == "בן") {
      if (this.arrayCurrentInstitionPast[this.x].institution?.institutionName != null &&
        this.arrayCurrentInstitionPast[this.x].institution?.institutionName != undefined) {
        this.isInstitionPast += "למד ב: "
          + this.arrayCurrentInstitionPast[this.x].institution?.institutionName
        if (this.arrayCurrentInstitionPast[this.x].institution?.enotherName != null) {
          this.isInstitionPast += "," + this.arrayCurrentInstitionPast[this.x].institution?.enotherName + ",";
        }
        if (this.arrayCurrentInstitionPast[this.x].details != null) {
          this.isInstitionPast += " ו" + this.arrayCurrentInstitionPast[this.x].details;
        }
      }
    }
    if (this.gender == "בת") {
      if (this.arrayCurrentInstitionPast[this.x].institution?.institutionName != null) {
        this.isInstitionPast += "למדה ב: "
          + this.arrayCurrentInstitionPast[this.x].institution?.enotherName
        if (this.arrayCurrentInstitionPast[this.x].institution?.enotherName != null) {
          this.isInstitionPast += "," + this.arrayCurrentInstitionPast[this.x].institution?.enotherName + ",";
        }
        if (this.arrayCurrentInstitionPast[this.x].details != null) {
          this.isInstitionPast += " ו" + this.arrayCurrentInstitionPast[this.x].details;
        }
      }

    }
    if (this.x + 1 < this.arrayCurrentInstitionPast.length) {
      if (this.arrayCurrentInstitionPast[this.x].institution?.idCategoryNavigation?.detailsCategory
        != this.arrayCurrentInstitionPast[this.x + 1].institution?.idCategoryNavigation?.detailsCategory) {
        this.namePresentIns = "ב" + this.arrayCurrentInstitionPast[this.x + 1].institution?.idCategoryNavigation?.detailsCategory;
      }
      this.x += 1;
    }

  }
  newCategory() {
    this.isChange = true;
    this.namePresentIns = "" + this.arrayCurrentInstitionPast[this.x].institution?.idCategoryNavigation?.detailsCategory;
    this.repeatCategory();
  }

  addTraetmentDetails() {
    this.newTreatmentDedails.applyId = this.idApply;
    this.newTreatmentDedails.statusId = 4
    this.newTreatmentDedails.taskId = 2012;
    this.newTreatmentDedails.nextStepId = 11;
    this.newTreatmentDedails.therapistId = this.currentEmplorees.id;

    //שליחה לממלא האינטייק
    this.newTreatmentDedails.nextEmployeesId = 5;
    this.newTreatmentDedails.dateNow = new Date();
    this.newTreatmentDedails.dateTask = new Date();
    this.treatmentDetailsService.AddTreatmentDetails(this.newTreatmentDedails).subscribe(result => {
      this.myRouter.navigate(['/showDetailsApply/' + this.idApply]);

    },
      err => { console.log("error") });
  }


}
