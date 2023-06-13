import { ChangeDetectorRef, Component, ContentChild, Input, OnInit, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InstitutionsCategory } from 'src/app/Classes/InstitutionsCategory';
import { PatientDetails } from 'src/app/Classes/PatientDetails';
import { AgeRangeService } from 'src/app/Services/age-range.service';
import { InstitutionsCategoryService } from 'src/app/Services/institutions-category.service';
import { PatientDetailsService } from 'src/app/Services/patient-details.service';
import { EducationalInstitutionsApplicantComponent } from '../educational-institutions-applicant/educational-institutions-applicant.component';

@Component({
  selector: 'app-institutions-category-first',
  templateUrl: './institutions-category-first.component.html',
  styleUrls: ['./institutions-category-first.component.scss'],
})

export class InstitutionsCategoryFirstComponent implements OnInit {
  @ContentChild(EducationalInstitutionsApplicantComponent) childComponent?: EducationalInstitutionsApplicantComponent;


  constructor(private patientDetailsService: PatientDetailsService,
    private institutionsCategoryService: InstitutionsCategoryService,
    private myRouter: Router,
    private ageRangeService: AgeRangeService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef) { }

  color: ThemePalette = "primary";
  arrayCategory: InstitutionsCategory[] = [];
  chooseCategory: string = "";
  isInstitutions!: boolean;
  isAnotherCategory: boolean = false;
  anotherCategory: string = "";
  newEduCtegory: InstitutionsCategory = new InstitutionsCategory();
  numApply: any;
  gender: any;
  age: any;
  indexCategory: any;
  isTvach?: boolean;
  currentCategory: InstitutionsCategory = new InstitutionsCategory();
  isPressCategory: boolean = false;
  press: number = 0;
  newPatientDetails: PatientDetails = new PatientDetails();
  isInstitionPast?: boolean;
  ngOnInit(): void {
    this.isTvach = true;
    this.isAnotherCategory = false;
    let isPast = sessionStorage.getItem('isPast');
    let arrCate = sessionStorage.getItem('currentListCategory');
    if (isPast != null) {
      this.isInstitionPast = JSON.parse(isPast);
    }
    let data = sessionStorage.getItem('currentPatientDetails');
    if (data !== null) {
      this.newPatientDetails = JSON.parse(data) as PatientDetails;
      this.age = this.newPatientDetails.ageFillApply;
      this.gender = this.newPatientDetails.gender;
    }
      if (arrCate == '[]' || arrCate == null) {
        this.institutionsCategoryService.GetAllInstitutionsCategoriesByGenderAndAge
          (this.gender, this.age).subscribe(arrInsCategory => {
            this.arrayCategory = arrInsCategory;
            sessionStorage.setItem("currentListCategory", JSON.stringify(arrInsCategory));
          },
            err => { console.log("error") });
      }
      else {
        if (arrCate !== null)
          this.arrayCategory = JSON.parse(arrCate) as InstitutionsCategory[];
      }
  }


  onSelectedValueChangeCategory(category: any) {
    this.press += 1;
    this.isAnotherCategory = false;
    this.isPressCategory = false;
    this.currentCategory = category;
    this.indexCategory = this.arrayCategory.findIndex(c => c.id == category.id);
    // this.institutionsCategoryService.indexCurrentListInstitutionsCategory = this.arrayCategory.findIndex(c => c.id == category.id);
    //מכינות
    //אחר
    if (category.id == 2 || category.id == 1019)
      this.isAnotherCategory = true;
    else if (this.press > 1) {
      this.isPressCategory = false;
      this.isInstitionPast = false
    }
    else
      this.isPressCategory = true;
  }


  sendValue(value: any) {
    this.newEduCtegory.detailsCategory = value;
    this.newEduCtegory.gender = this.patientDetailsService.currentGender;
    if (this.age != undefined) {
      this.ageRangeService.GetIdAgeRangeByAge(this.age).subscribe(idAgeRange => {
        this.newEduCtegory.ageRange = idAgeRange;
        this.addnewEdu();
      },
        err => { console.log("error") });
    }
  }
  isPressCategoryT() {
    this.isPressCategory = true;
  }

  addnewEdu() {
    console.log(this.newEduCtegory)
    this.institutionsCategoryService.AddInstitutionsCategory(this.newEduCtegory).subscribe(idNewEduCtegory => {
      console.log("addnewEdu" + idNewEduCtegory);
      this.isPressCategory = true;
      // this.myRouter.navigate(['/educationalInstitutionsApplicant/' + this.numApply + '/' + this.indexCategory + '/' + this.isTvach + '/0']);
    },
      err => { console.log("error") });

  }
}
