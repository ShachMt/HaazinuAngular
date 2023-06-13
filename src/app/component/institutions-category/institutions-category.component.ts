import { Component, OnInit } from '@angular/core';
import { InstitutionsCategory } from 'src/app/Classes/InstitutionsCategory';
import { InstitutionsCategoryService } from 'src/app/Services/institutions-category.service';
import { PatientDetailsService } from 'src/app/Services/patient-details.service';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AgeRangeService } from 'src/app/Services/age-range.service';
@Component({
  selector: 'app-institutions-category',
  templateUrl: './institutions-category.component.html',
  styleUrls: ['./institutions-category.component.scss']
})
export class InstitutionsCategoryComponent implements OnInit {

  constructor(private patientDetailsService: PatientDetailsService,
    private institutionsCategoryService: InstitutionsCategoryService,
    private myRouter: Router,
    private ageRangeService: AgeRangeService,
    private route: ActivatedRoute
  ) { }
  color: ThemePalette = "primary";
  arrayCategoryA: InstitutionsCategory[] = [];
  arrayCategory: any;
  //* InstitutionsCategory[] = [];
  currentCategory: InstitutionsCategory = new InstitutionsCategory();
  chooseCategory: string = "";
  isAnotherCategory: boolean = false;
  anotherCategory: string = "";
  newEduCtegory: InstitutionsCategory = new InstitutionsCategory();
  numApply: any;
  indexCategory: any;
  isTvach?: boolean;
  isPressCategory: boolean = false;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      const indexCategory = +params['indexCategory'];
      this.indexCategory = indexCategory;
      this.numApply = id;
    });
    this.arrayCategory = [];
    this.isTvach = true;
    this.isAnotherCategory = false;
    if (this.institutionsCategoryService.currentListCategory != null) {
      this.arrayCategory = JSON.parse(this.institutionsCategoryService.currentListCategory);
    }

  }

  onSelectedValueChangeCategory(category: any) {
    // this.institutionsCategoryService.currentCategory = category;
    this.isAnotherCategory=false;
    this.currentCategory=category;
    for (let i = 0; i < this.arrayCategory.length; i++) {
      if (this.arrayCategory[i].id == category.id) {
        this.indexCategory = i;
      }
    }
    // this.institutionsCategoryService.indexCurrentListInstitutionsCategory = this.arrayCategory.findIndex(c => c.id == category.id);
    //מכינות
    if (category.id == 8 ||
      category.id == 9 ||
      category.id == 13) {
      //* this.institutionsCategoryService.isTvach = false;
      this.isTvach = false;
      this.myRouter.navigate(['/educationalInstitutionsApplicant/' + this.numApply + '/' + this.indexCategory + '/' + this.isTvach + '/1']);
    }
    //לשמור את שם הקטגוריה האחרת ברגע שמשנים את המלל 
    //לעבור לדף המוסדות
    else if (category.id == 2 || category.id == 1019)
      this.isAnotherCategory = true;
    else
      this.myRouter.navigate(['/educationalInstitutionsApplicant/' + this.numApply + '/' + this.indexCategory + '/' + this.isTvach + '/1']);
  }
  sendValue(value: any) {
    this.newEduCtegory.detailsCategory = value;
    this.newEduCtegory.gender = this.patientDetailsService.currentGender;
    this.ageRangeService.GetIdAgeRangeByAge(this.patientDetailsService.currentAge).subscribe(idAgeRange => {
      this.newEduCtegory.ageRange = idAgeRange;
      this.addnewEdu();
    },
      err => { console.log("error") });

  }
  addnewEdu() {
    console.log(this.newEduCtegory)
    this.institutionsCategoryService.AddInstitutionsCategory(this.newEduCtegory).subscribe(idNewEduCtegory => {
      console.log("addnewEdu" + idNewEduCtegory);
      this.institutionsCategoryService.currentCategory = this.newEduCtegory;
      this.myRouter.navigate(['/educationalInstitutionsApplicant/' + this.numApply + '/' + this.indexCategory + '/' + this.isTvach + '/1']);

    },
      err => { console.log("error") });

  }
}
