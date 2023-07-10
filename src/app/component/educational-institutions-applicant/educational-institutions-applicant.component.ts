import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Address } from 'src/app/Classes/Address';
import { EducationalInstitution } from 'src/app/Classes/EducationalInstitution';
import { EducationalInstitutionsApplicant } from 'src/app/Classes/EducationalInstitutionsApplicant';
import { InstitutionsCategory } from 'src/app/Classes/InstitutionsCategory';
import { PatientDetails } from 'src/app/Classes/PatientDetails';
import { User } from 'src/app/Classes/User';
import { AddressService } from 'src/app/Services/address.service';
import { ApplyService } from 'src/app/Services/apply.service';
import { EducationalInstitutionService } from 'src/app/Services/educational-institution.service';
import { EducationalInstitutionsApplicantService } from 'src/app/Services/educational-institutions-applicant.service';
import { InstitutionsCategoryService } from 'src/app/Services/institutions-category.service';
import { PatientDetailsService } from 'src/app/Services/patient-details.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-educational-institutions-applicant',
  templateUrl: './educational-institutions-applicant.component.html',
  styleUrls: ['./educational-institutions-applicant.component.scss']
})
export class EducationalInstitutionsApplicantComponent implements OnInit {
  @Input()
  category: InstitutionsCategory = new InstitutionsCategory();
  @Input()
  indexCategory: any;
  form!: FormGroup;
  constructor(private patientDetailsService: PatientDetailsService,
    private institutionsCategoryService: InstitutionsCategoryService,
    private addressService: AddressService,
    private formBuilder: FormBuilder,
    private myRouter: Router,
    private educationalInstitutionService: EducationalInstitutionService,
    private educationalInstitutionsApplicantService: EducationalInstitutionsApplicantService,
    private applyService: ApplyService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }
  arrayG = [
    { id: 1, name: "ועד א" },
    { id: 3, name: "ועד ב" },
    { id: 4, name: "ועד ג" },
    { id: 5, name: "ועד ד" },
    { id: 6, name: "ועד ה" },
    { id: 7, name: "ועד ו ומעלה" }
  ];
  arrayK = [
    { id: 1, name: "שיעור א" },
    { id: 2, name: "שיעור ב" },
    { id: 3, name: "שיעור ג" },
    { id: 4, name: "שיעור ד" },
  ];
  arrayC = [
    { id: 1, name: "כיתה א" },
    { id: 2, name: "כיתה ב" },
    { id: 3, name: "כיתה ג" },
    { id: 4, name: "כיתה ד" },
    { id: 5, name: "כיתה ה" },
    { id: 6, name: "כיתה ו " },
    { id: 7, name: "כיתה ז" },
    { id: 8, name: "כיתה ח" },
    { id: 9, name: "כיתה י" },
    { id: 10, name: "כיתה יא" },
    { id: 11, name: "כיתה יב" },
    { id: 12, name: "כיתה יג " },
    { id: 13, name: "כיתה יד " }
  ];
  arrayYLeave = [
    { id: 1, name: "אלול" },
    { id: 2, name: "חורף אמצע זמן" },
    { id: 3, name: " חורף סוף זמן" },
    { id: 4, name: " קיץ אמצע זמן" },
    { id: 5, name: " קיץ סוף זמן" }
  ];
  arrayCLeave = [
    { id: 1, name: " אמצע שנה" },
    { id: 1, name: "סוף שנה " },

  ];
  chooseArray: any;
  // index:number=this.institutionsCategoryService.indexCurrentListInstitutionsCategory;
  currentCategory: any;
  isPressCategory: boolean = false;
  arrayExistCities: string[] = [];
  selectedValueCity: string = "";
  isAnotherCity: boolean = false;
  //** */ nameAnotherCity:string="";
  arrayEducational: EducationalInstitution[] = [];
  currentChooseEdu: EducationalInstitution = new EducationalInstitution();
  isInstitionPast: boolean = false;
  arrayCityByEdu: string[] = [];
  notExistCity: boolean = false;
  nameAnotherCity: string = "";

  ///////////////////////////
  arrayECat: EducationalInstitution[] = [];
  arrayToShow: EducationalInstitution[] = [];
  selectedValueNameIns: string = "";
  isAnotherInstiton: boolean = false;
  newEducationalInstitution: EducationalInstitution = new EducationalInstitution();
  chooseCategory: string = "";
  newAddress: Address = new Address();
  isTvach: any;
  //כיתת עזיבה
  selectedValueClassL: string = "";
  //זמן עזיבה
  chooseTimeLeave: string = "";
  chooseArrayLeave: any;
  newEducationalInstitutionsApplicant: EducationalInstitutionsApplicant = new EducationalInstitutionsApplicant();
  currentPatientDetailsByApplyId: PatientDetails = new PatientDetails();
  numApply: any;
  arrCategory: InstitutionsCategory[] = [];
  arrayNewCategory: InstitutionsCategory[] = [];
  isNextFillIntake: boolean = false;
  isSaveNow: boolean = false
  userP: User = new User();
  currentEducation: EducationalInstitutionsApplicant[] = [];
  openNew:boolean=false;
  lastEducation: EducationalInstitutionsApplicant = new EducationalInstitutionsApplicant();
  isUpdate:boolean=false;
  titleU:string="";
  ngOnInit(): void {
    this.openNew=false;
    this.isAnotherInstiton = false;
    this.isUpdate=false
    let data = sessionStorage.getItem('currentPatientDetails');
    if (data !== null) {
      this.currentPatientDetailsByApplyId = JSON.parse(data) as PatientDetails;
    }
    let arrayCategory = sessionStorage.getItem('currentListCategory');
    if (arrayCategory != null) {
      this.arrCategory = JSON.parse(arrayCategory) as InstitutionsCategory[];
    }
    let userP = sessionStorage.getItem('userPatientDetails');
    if (userP != null) {
      this.userP = JSON.parse(userP) as User;
      if(this.userP.id)
      this.educationalInstitutionsApplicantService.getAllEducationalInstitutionByUserIdStatus(this.userP.id, "עבר      ").subscribe(arrIns => {

        this.currentEducation = arrIns;
        //השמה של הרשימה הרלוונטית
        // if (this.currentEducation.length > 0) {
        //   this.lastEducation = this.currentEducation[this.currentEducation.length - 1];
        //   if (this.lastEducation.institution?.idCategoryNavigation) {
        //     this.category = this.lastEducation.institution?.idCategoryNavigation;
        //     this.indexCategory = this.arrCategory.findIndex(c => c.id == this.category.id);
        //     for (let index = this.indexCategory; index < this.arrCategory.length; index++) {
        //       this.arrayNewCategory.push(this.arrCategory[index]);
        //     }
        //     this.arrCategory=this.arrayNewCategory;
        //     sessionStorage.setItem("currentListCategory", JSON.stringify(this.arrayNewCategory));
        //     this.arrayNewCategory = [];

        //   }
        // }
      },
        err => { console.log("error") });

    }
    if (this.category.id) {
      this.educationalInstitutionService.GetAllInstitutionsByCategories(this.category.id)
        .subscribe(allEducational => {
          this.arrayEducational = allEducational;
          if (this.arrayEducational.length == 0) {
            this.isAnotherInstiton = true;
            this.notExistCity = true;
          }
          // //getAllcity
          // this.addressService.GetAllCities().subscribe(allCities => {
          //   this.arrayExistCities = allCities;
          //   console.log(allCities);
          // },
          //   err => { console.log("error") });
        },
          err => { console.log("error") });
    }

    //בחירת הצג}ת טווח של שנת הלימודים
    // if (this.category.id == 8 || this.category.id == 9 || this.category.id == 13) {
    // }
    // else if (this.category.id == 18 || this.category.id == 14) {
    //   this.chooseArray = this.arrayG;
    //   this.chooseArrayLeave = this.arrayYLeave;
    // }
    // else if (this.category.id == 3) {
    //   this.chooseArray = this.arrayK;
    //   this.chooseArrayLeave = this.arrayYLeave;
    // }
    // else {
    //   this.chooseArray = this.arrayC;
    //   this.chooseArrayLeave = this.arrayCLeave;
    // }


    this.form = this.formBuilder.group({
      hebrewLetters: [null, [Validators.pattern(`^[\u0590-\u05FF .,?!"':;_()-\]+$`)]],
      learnPlace: ["", Validators.required],
      year: ["", Validators.required],

    });


  }
  deleteCurrentIns(item: any) {
    debugger
    const dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      result.delete && this.deleteIns(item.id);
    });
  }
  deleteIns(id: any) {
    if (id) {
      this.educationalInstitutionsApplicantService.deleteEducational(id).
        subscribe(result => {
          this.educationalInstitutionsApplicantService.getAllEducationalInstitutionByUserIdStatus(this.userP.id, "עבר      ").subscribe(arrIns => {
            this.currentEducation = arrIns;
          },
            err => { console.log("error") });
    
        },
          err => { console.log("error") });
    }
  }
  updateIns(item: any) {
 this.newEducationalInstitutionsApplicant=item;
 this.selectedValueNameIns=""+this.newEducationalInstitutionsApplicant.institution?.institutionName;
 this.chooseCategory=""+this.newEducationalInstitutionsApplicant.institution?.idCategoryNavigation?.detailsCategory;
 this.isUpdate=true;

 this.titleU="עדכון : "+this.newEducationalInstitutionsApplicant.institution?.idCategoryNavigation?.detailsCategory+"-"+this.newEducationalInstitutionsApplicant.institution?.institutionName
 ","+this.newEducationalInstitutionsApplicant.institution?.enotherName+","+this.newEducationalInstitutionsApplicant.institution?.address?.city
 let data = sessionStorage.getItem('currentPatientDetails');
 if (data !== null) {
   let newPatientDetails = JSON.parse(data) as PatientDetails; 
   this.institutionsCategoryService.GetAllInstitutionsCategoriesByGenderAndAge
   (newPatientDetails.gender, newPatientDetails.ageFillApply).subscribe(arrInsCategory => {
     this.arrCategory = arrInsCategory;

   },
     err => { console.log("error") });
  
  }

}
  isUp(){
    let id=this.newEducationalInstitutionsApplicant.id;
    this.newEducationalInstitutionsApplicant.institutionId = this.currentChooseEdu.id;
    this.newEducationalInstitutionsApplicant.details = 
    this.chooseTimeLeave+","+this.selectedValueClassL;
    this.newEducationalInstitutionsApplicant.status="עבר";
    this.educationalInstitutionsApplicantService.updateEducational(id,this.newEducationalInstitutionsApplicant).
    subscribe(result => {
      this.isUpdate=false;
      let arrayCategory = sessionStorage.getItem('currentListCategory');
    if (arrayCategory != null) {
      this.arrCategory = JSON.parse(arrayCategory) as InstitutionsCategory[];
      this.educationalInstitutionsApplicantService.getAllEducationalInstitutionByUserIdStatus(this.userP.id, "עבר      ").subscribe(arrIns => {
        this.currentEducation = arrIns;
      },
        err => { console.log("error") });
    }
    },
      err => { console.log("error") });
  }
  getErrorMessageHebrewLetters() {
    if (this.form.get('hebrewLetters')?.hasError('pattern')) {
      return '  אותיות עברית בלבד    ';
    }
    return;
  }
  getErrorMessageYear() {
    if (this.form.get('year')?.hasError('required')) {
      return '  שדה חובה ';
    }
    return '';
  }
  getErrorMessageLearnPlace() {
    if (this.form.get('learnPlace')?.hasError('required')) {
      return '  שדה חובה ';
    }
    return '';

  }
  onSelectedValueChangeCategory(category: any) {
    this.isPressCategory = false;
    this.currentCategory = category;
    this.indexCategory = this.arrCategory.findIndex(c => c.id == category.id);
    this.educationalInstitutionService.GetAllInstitutionsByCategories(category.id)
      .subscribe(allEducational => {
        this.arrayEducational = allEducational;
        if (this.arrayEducational.length == 0) {
          this.isAnotherInstiton = true;
        }
      },
        err => { console.log("error") });

    //בחירת הצג}ת טווח של שנת הלימודים
    if (category.id == 8 || category.id == 9 || category.id == 13) {
    }
    else if (category.id == 18 || category.id == 14) {
      this.chooseArray = this.arrayG;
      this.chooseArrayLeave = this.arrayYLeave;
    }
    else if (category.id == 3) {
      this.chooseArray = this.arrayK;
      this.chooseArrayLeave = this.arrayYLeave;
    }
    else {
      this.chooseArray = this.arrayC;
      this.chooseArrayLeave = this.arrayCLeave;
    }
  }
  //בחירת מוסד לימודים

  onSelectedValueNameIns(ins: any) {
    debugger
    this.isAnotherInstiton = false;
    this.notExistCity = false;
    if (!this.currentCategory?.id) {
      alert("יש להזין את סוג מוסד הלימודים")
    }
    else {
      if (ins == " " || ins == undefined) {
        this.isAnotherInstiton = true;
        this.notExistCity = true;
      }
      else {
        for (let index = 0; index < this.arrayEducational.length; index++) {
          if (this.arrayEducational[index].institutionName == ins) {
            this.currentChooseEdu = this.arrayEducational[index];
          }
        }
      }
    }
  }
  isClickReturnList() {
    this.notExistCity = false;
    this.isAnotherInstiton = false;
    this.selectedValueNameIns = "";
  }

  ///////////////////////
  /////////שליחת מוסד לימודים חדש//////////////////////
  openDeleteDialog(item: any) {
    const dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      result.delete && this.deleteEducation(item.id);
    });

  }
  deleteEducation(id: any) {
    this.educationalInstitutionsApplicantService.deleteEducational(id).subscribe(result => {
      console.log(result);
      this.educationalInstitutionsApplicantService.getAllEducationalInstitutionByUserIdStatus(this.userP.id, "עבר      ").subscribe(arrIns => {
        this.currentEducation = arrIns;
      },
        err => { console.log("error") });

    },
      err => { console.log("error") });
  }
  add(){
    this.openNew=true;
    this.newEducationalInstitutionsApplicant=new EducationalInstitutionsApplicant();
    this.chooseTimeLeave="";
    this.selectedValueClassL="";
    this.selectedValueNameIns="";
  }
  next() {
      this.addEducational()
  }
  //הוספת עיר/ כתובת חדשה
  addAddressCity() {
    this.addressService.AddAddress(this.newAddress).subscribe(idAddress => {
      this.newEducationalInstitution.addressId = idAddress;
      this.newEducationalInstitution.idCategory = this.currentCategory.id;
      this.educationalInstitutionService.AddEducationalInstitution(this.newEducationalInstitution)
        .subscribe(idNewInst => {
          this.selectedValueNameIns=""+this.newEducationalInstitution.institutionName+"-"+this.newEducationalInstitution.enotherName;
          this.newAddress=new Address();
          this.newEducationalInstitution=new EducationalInstitution();
          this.newEducationalInstitutionsApplicant.institutionId = idNewInst;
          this.notExistCity = false;
          this.isAnotherInstiton = false;
          this.educationalInstitutionService.GetAllInstitutionsByCategories(this.currentCategory.id)
            .subscribe(allEducational => {
              this.arrayEducational = allEducational;
              for (let index = 0; index < this.arrayEducational.length; index++) {
                if (this.arrayEducational[index].id ==this.newEducationalInstitutionsApplicant.institutionId) {
                  this.currentChooseEdu = this.arrayEducational[index];
                }
              }
              if (this.arrayEducational.length == 0) {
                this.isAnotherInstiton = true;
              }
            },
              err => { console.log("error") });
         
        },
          err => { console.log("error") });
    },
      err => { console.log("error") });
  }
  addEducational() {
      this.newEducationalInstitutionsApplicant.userId = this.userP.id;
      this.newEducationalInstitutionsApplicant.institutionId = this.currentChooseEdu.id;
      this.newEducationalInstitutionsApplicant.status = "עבר";
       this.newEducationalInstitutionsApplicant.details =
        this.selectedValueClassL + "  זמן עזיבה :" + this.chooseTimeLeave;
      this.educationalInstitutionsApplicantService.AddEducational(this.newEducationalInstitutionsApplicant)
        .subscribe(idEduAp => {
          this.openNew=false;
          this.educationalInstitutionsApplicantService.getAllEducationalInstitutionByUserIdStatus(this.userP.id, "עבר      ").subscribe(arrIns => {
            if (arrIns.length > 0){
            this.currentEducation=arrIns;
              this.newEducationalInstitutionsApplicant = arrIns[0];}
            if (this.newEducationalInstitutionsApplicant.institution?.idCategoryNavigation?.detailsCategory)
              this.chooseCategory =
                this.newEducationalInstitutionsApplicant.institution?.idCategoryNavigation?.detailsCategory
                this.newEducationalInstitutionsApplicant=new EducationalInstitutionsApplicant();
          },
            err => { console.log("error") });
          for (let index = this.indexCategory; index < this.arrCategory.length; index++) {
            this.arrayNewCategory.push(this.arrCategory[index]);
          }
          sessionStorage.setItem("currentListCategory", JSON.stringify(this.arrayNewCategory));
          this.arrayNewCategory = [];
        },
          err => { console.log("error") });
  }
  
  saveNow() {
    this.isSaveNow = true;
    this.next();

  }
}
