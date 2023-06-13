import { Component, HostListener, Input, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { PatientDetails } from 'src/app/Classes/PatientDetails';
import { Sector } from 'src/app/Classes/Sector';
import { User } from 'src/app/Classes/User';
import { ApplyService } from 'src/app/Services/apply.service';
import { EmployeeService } from 'src/app/Services/employee.service';
import { SectorService } from 'src/app/Services/sector.service';
import { UserService } from 'src/app/Services/user.service';
import { MatDatepicker } from '@angular/material/datepicker';
import { Family } from 'src/app/Classes/Family';
import { Address } from 'src/app/Classes/Address';
import { PatientDetailsService } from 'src/app/Services/patient-details.service';
import { AddressService } from 'src/app/Services/address.service';
import { FamilyService } from 'src/app/Services/family.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Apply } from 'src/app/Classes/Apply';
import { Employee } from 'src/app/Classes/Employee';
import { ThemePalette } from '@angular/material/core';
import { MatureCharacter } from 'src/app/Classes/MatureCharacter';
import { DetailsAsker } from 'src/app/Classes/DetailsAsker';
import { MatureCharacterService } from 'src/app/Services/mature-character.service';
import { DetailsAskerService } from 'src/app/Services/details-asker.service';
import { TreatmentDetailsService } from 'src/app/Services/treatment-details.service';
import { TreatmentDetails } from 'src/app/Classes/TreatmentDetails';
import { Location } from '@angular/common'
import { InstitutionsCategory } from 'src/app/Classes/InstitutionsCategory';
import { InstitutionsCategoryService } from 'src/app/Services/institutions-category.service';
import { EducationalInstitution } from 'src/app/Classes/EducationalInstitution';
import { EducationalInstitutionService } from 'src/app/Services/educational-institution.service';
import { EducationalInstitutionsApplicant } from 'src/app/Classes/EducationalInstitutionsApplicant';
import { EducationalInstitutionsApplicantService } from 'src/app/Services/educational-institutions-applicant.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-fill-new-apply',
  templateUrl: './fill-new-apply.component.html',
  styleUrls: ['./fill-new-apply.component.scss']
})
export class FillNewApplyComponent implements OnInit {

  constructor(private snackBar: MatSnackBar,
    private matureCharacterService: MatureCharacterService,
    private detailsAskerService: DetailsAskerService,
    private applyService: ApplyService,
    private employeeService: EmployeeService,
    private userService: UserService,
    private sectorService: SectorService,
    private formBuilder: FormBuilder,
    private addressService: AddressService,
    private patientDetailsService: PatientDetailsService,
    private familyService: FamilyService,
    private myRouter: Router,
    private route: ActivatedRoute,
    private renderer: Renderer2,
    private treatmentDetailsService: TreatmentDetailsService,
    private location: Location,
    private institutionsCategoryService: InstitutionsCategoryService,
    private educationalInstitutionService: EducationalInstitutionService,
    private educationalInstitutionsApplicantService: EducationalInstitutionsApplicantService,
    public dialog: MatDialog

  ) { }

  form!: FormGroup;
  arrayMonth = [
    { id: 1, name: "תשרי" },
    { id: 2, name: "חשוון" },
    { id: 3, name: "כסליו" },
    { id: 4, name: "טבת" },
    { id: 5, name: "שבט" },
    { id: 6, name: "אדר" },
    { id: 7, name: "ניסן" },
    { id: 8, name: "אייר" },
    { id: 9, name: "סיון" },
    { id: 10, name: "תמוז" },
    { id: 11, name: "אב" },
    { id: 12, name: "אלול" },
    { id: 1, name: "ינואר" },
    { id: 2, name: "פברואר" },
    { id: 3, name: "מרץ" },
    { id: 4, name: "אפריל" },
    { id: 5, name: "מאי" },
    { id: 6, name: "יוני" },
    { id: 7, name: "יולי" },
    { id: 8, name: "אוגוסט" },
    { id: 9, name: "ספטמבר" },
    { id: 10, name: "אוקטובר" },
    { id: 11, name: "נובמבר" },
    { id: 12, name: "דצמבר" },

  ];
  arrayGender = [
    { id: 1, name: "זכר" },
    { id: 2, name: "נקבה" }
  ];
  arrayStatusParent = [
    { id: 1, name: "נורמטיבי" },
    { id: 2, name: " גרושים " },
    { id: 3, name: "יתומים" },
    { id: 4, name: "אחר" }

  ];
  arrayReferral = [
    { id: 1, name: "פונה עבור עצמו" },
    { id: 2, name: "הורים" },
    { id: 3, name: "אח/אחות" },
    { id: 4, name: "חונך/רב" },
    { id: 5, name: "אחר" }
  ];
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


  private isDragging: boolean = false;
  private initialX: number = 0;
  private initialY: number = 0;

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.isDragging) {
      const offsetX = event.clientX - this.initialX;
      const offsetY = event.clientY - this.initialY;
      const movableDiv = document.querySelector('.fff') as HTMLElement;
      movableDiv.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    }
  }

  onMouseDown(event: MouseEvent) {
    this.isDragging = true;
    this.initialX = event.clientX;
    this.initialY = event.clientY;
  }

  onMouseUp(event: MouseEvent) {
    this.isDragging = false;
  }

  arraySector: Sector[] = [];
  anotherSector: string = "";
  anotherSectorO: Sector = new Sector();
  isAnotherSector: boolean = false;
  newTreatmentDetails: TreatmentDetails = new TreatmentDetails();
  selectedValueR: string = "";
  selectedValueRO: string = "";
  selectIsStillTerapist: string = "";
  newPatientDetails: PatientDetails = new PatientDetails();
  selectedOptionTipul: string = "";
  isMatureCaracter?: boolean;
  selectIsMatureCaracter: string = "";
  matureCharacter: MatureCharacter = new MatureCharacter();
  permissionContact: string = "";
  isTipul?: boolean;
  userMetapel: User = new User();
  userMetapelC: User = new User();

  isMatureCharacter?: boolean;
  newMatureCharacter: MatureCharacter = new MatureCharacter();
  userMature: User = new User();
  newUserTherapist: User = new User();
  newDetailsAsker: DetailsAsker = new DetailsAsker();
  numApply: any;
  nameFill: any;
  currentEmployees: Employee = new Employee();
  dateFill: Date = new Date();
  user: User = new User();
  newFamily: Family = new Family();
  age: string = "";
  ageNow?: number;
  hebDate: string = "";
  newAddress: Address = new Address();
  selectedOptionIns: any;
  isInstition?: boolean;
  isJerusalem: boolean = false;
  currentApply: Apply = new Apply();
  isNotExistPatient: boolean = false;
  familyDetails: string = "";
  isPressPE: boolean = false;
  isPressRM: boolean = false;
  isPressMM: boolean = false;
  isPressMLN: boolean = false;
  isPressPP: boolean = false;
  isPressSZ: boolean = false;
  color: ThemePalette = "primary";
  isInstitionPast?: boolean;
  isAnotherR?: boolean;
  isOp: boolean = false;
  /////////////////avidan
  isAnotherCity: boolean = false;
  arrayCategory: InstitutionsCategory[] = [];
  chooseCategory: string = "";
  currentCategory: InstitutionsCategory = new InstitutionsCategory();
  isPressCategory: boolean = false;
  press: number = 0;
  indexCategory: any;
  arrayEducational: EducationalInstitution[] = [];
  chooseArrayLeave: any;
  chooseArray: any;
  isAnotherInstiton: boolean = false;
  selectedValueNameIns: string = "";
  notExistCity: boolean = false;
  currentChooseEdu: EducationalInstitution = new EducationalInstitution();
  newEducation: EducationalInstitutionsApplicant = new EducationalInstitutionsApplicant();
  arrayEdu: EducationalInstitutionsApplicant[] = [];
  newEducationalInstitution: EducationalInstitution = new EducationalInstitution();
  newEducationalInstitutionsApplicant: EducationalInstitutionsApplicant = new EducationalInstitutionsApplicant();
  newEducationalInstitutionsApplicantF: EducationalInstitutionsApplicant = new EducationalInstitutionsApplicant();
  opentLastEdu: boolean = false;
  newAddressE: Address = new Address();
  isUpdate: boolean = false;
  id: any;
  //כיתת עזיבה
  selectedValueClassL: string = "";
  //זמן עזיבה
  chooseTimeLeave: string = "";
  arrayNewCategory: InstitutionsCategory[] = [];
  diagnosesB: boolean = false;
  emotionalB: boolean = false;
  socialB: boolean = false;
  studiesB: boolean = false;
  //dateHebr
  // date = new Date();


  ngOnInit(): void {
    this.isUpdate = false;
    this.isOp = false;
    this.isAnotherInstiton = false;
    this.opentLastEdu = false;
    this.isTipul = false;
    this.isNotExistPatient = false;
    this.route.params.subscribe(params => {
      const id = +params['idApply'];
      this.numApply = id;
      // const isPastEducation = Boolean(params['isPastEducation']);
      // this.isInstitionPast = isPastEducation;
      sessionStorage.setItem("isPast", JSON.stringify(this.isInstitionPast));
      if (this.isInstitionPast == true) {
        this.isPressMLN = true;
      }
      sessionStorage.setItem("applyId", JSON.stringify(id));
      this.getCurrentApply();
    });
    let currentFamily = sessionStorage.getItem('currentFamily');
    if (currentFamily !== null) {
      this.newFamily = JSON.parse(currentFamily) as Family;
    }


    let detailsAsker = sessionStorage.getItem('detailsAsker');
    if (detailsAsker !== null) {
      this.newDetailsAsker = JSON.parse(detailsAsker) as DetailsAsker;
    }

    let currentAddress = sessionStorage.getItem('currentAddress');
    if (currentAddress !== null) {
      this.newAddress = JSON.parse(currentAddress) as Address;
    }
    let userPatientDetails = sessionStorage.getItem('userPatientDetails');
    if (userPatientDetails !== null) {
      this.user = JSON.parse(userPatientDetails) as User;
    }
    //////////////////////////////////////

    let currentPatient = sessionStorage.getItem('currentPatientDetails');
    if (currentPatient !== null) {
      this.newPatientDetails = JSON.parse(currentPatient) as PatientDetails;
      this.isNotExistPatient = true;
      if (this.newPatientDetails.user)
        this.user = this.newPatientDetails.user;
      if (this.newPatientDetails.address) {

        this.isJerusalem = false;
        this.newAddress = this.newPatientDetails.address;
        if (this.newAddress.city == "ירושלים")
          this.isJerusalem = true;
      }
      if (this.newPatientDetails.family) {
        this.newFamily = this.newPatientDetails.family
        if (this.newFamily.familyDetails)
          this.familyDetails = this.newFamily.familyDetails
      }
    }
    else {
      this.patientDetailsService.getPatientDetailsByApplyId(this.numApply).subscribe(patientDetails => {
        if (patientDetails != null) {
          this.newPatientDetails = patientDetails;
          this.isNotExistPatient = true;
          if (this.newPatientDetails.user) {
            debugger
            this.user = this.newPatientDetails.user;
            sessionStorage.setItem("userPatientDetails", JSON.stringify(this.user));
          }
          if (this.newPatientDetails.therapeutic) {
            this.userMetapel = this.newPatientDetails.therapeutic;
            sessionStorage.setItem("userMetapel", JSON.stringify(this.userMetapel));
          }
          if (this.newPatientDetails.matureCharacter?.idMatureNavigation) {
            this.userMetapelC = this.newPatientDetails.matureCharacter.idMatureNavigation
            sessionStorage.setItem("userMetapelC", JSON.stringify(this.userMetapelC));
          }
          if (this.newPatientDetails.matureCharacter) {
            this.matureCharacter = this.newPatientDetails.matureCharacter;
          }
          if (this.newPatientDetails.address) {
            this.isJerusalem = false;
            this.newAddress = this.newPatientDetails.address;
            if (this.newAddress.city == "ירושלים")
              this.isJerusalem = true;
          }
          if (this.newPatientDetails.family) {
            this.newFamily = this.newPatientDetails.family
            if (this.newFamily.familyDetails)
              this.familyDetails = this.newFamily.familyDetails
          }
        }
      },
        err => { console.log("error") });
    }
    this.employeeService.getEmployee().subscribe(empL => {
      this.nameFill = empL?.idUserNavigation?.firstName;
      this.currentEmployees = empL;
      this.newPatientDetails.fillEmloyeesId = empL.id;
      this.newPatientDetails.applyId = this.numApply;
    },
      err => { console.log("error") });

    this.newPatientDetails.dateNow = new Date();

    this.isAnotherSector = false;
    let userP = sessionStorage.getItem('userPatientDetails');
    if (userP != null) {
      this.user = JSON.parse(userP) as User;
    }

    //הצגת מגזרים
    this.sectorService.GetAllSector().subscribe(arraySector => {
      this.arraySector = arraySector;
      console.log(this.arraySector);
    },
      err => { console.log("error") });
    this.form = this.formBuilder.group({
      hebrewLettersF: [null, [Validators.required, Validators.pattern(`^[\u0590-\u05FF .,?!"':;_()\n-\]+$`)]],
      hebrewLettersL: [null, [Validators.required, Validators.pattern(`^[\u0590-\u05FF .,?!"':;_()\n-\]+$`)]],
      numberV: [null, [Validators.required, Validators.pattern('^([1-9]|[1-2][0-9]|25)$')]],
      numberVV: [null, [Validators.required, Validators.pattern('^([1-9]|[1-2][0-9]|25)$')]],
      ageV: [null, [Validators.required, Validators.pattern('^([6-9]|[1-9][0-9])$')]],
      // textAreaHeb: [null, [Validators.required, Validators.pattern(`^[\u0590-\u05FF .,?!"':;_()\n-\]+$`)]],
      mobileNumber: [null, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      mobileNumberP: [null, [Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      textArea: [""],
      parent: [''],
      taalich: ['', Validators.required],
      first: [''],
      last: [''],
      mobileNumberM: [null, [Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      hebrewLettersC: [''],
      mobileNumberC: [null, [Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      hebrewLettersCM: [''],
      p: [""],
      studies: [""],
      social: [""],
      emotional: [""],
      diagnoses: [""],
      job: [""],
      hebrewLettersCL: [""],
      permissionContact: [""],
    });
  }
  isClickReturnList() {
    this.notExistCity = false;
    this.isAnotherInstiton = false;
    this.selectedValueNameIns = "";
  }
  isP(v: any) {
    switch (v) {
      case "diagnosesB":
        this.diagnosesB = !this.diagnosesB;
        this.emotionalB = false;
        this.socialB = false;
        this.studiesB = false;
        break;
      case "emotionalB":
        this.diagnosesB = false;
        this.emotionalB = !this.emotionalB;
        this.socialB = false;
        this.studiesB = false;
        break;
      case "socialB":
        this.diagnosesB = false;
        this.emotionalB = false;
        this.socialB = !this.socialB;
        this.studiesB = false;
        break;
      case "studiesB":
        this.diagnosesB = false;
        this.emotionalB = false;
        this.socialB = false;
        this.studiesB = !this.studiesB;
        break;
    }
  }
  isOpI() {
    debugger
    this.isAnotherInstiton = false;
    this.notExistCity = false;
    this.isOp = !this.isOp;
    this.newFamily.parentStatus = this.form.get('parent')?.value;
    sessionStorage.setItem("currentFamily", JSON.stringify(this.newFamily));
    sessionStorage.setItem("currentAddress", JSON.stringify(this.newAddress));
    if (this.newPatientDetails.gender == "" || this.newPatientDetails.ageFillApply == undefined || (this.newPatientDetails.gender == "" && this.newPatientDetails.ageFillApply == undefined)) {
      alert(" כדי שנוכל לעבור לעבור לשלב הבא יש לבחור מין :זכר / נקבה וכן למלא גיל")
      this.selectedOptionIns = null;
    }
    else {
      if (!this.user.id) {
        this.userService.AddUser(this.user).subscribe(asker => {
          this.newPatientDetails.userId = asker;
          this.user.id = asker;
          sessionStorage.setItem("currentPatientDetails", JSON.stringify(this.newPatientDetails));
          sessionStorage.setItem("userPatientDetails", JSON.stringify(this.user));
        },
          err => { console.log("error") });
      }
      else {
        this.newPatientDetails.userId = this.user.id;
        sessionStorage.setItem("currentPatientDetails", JSON.stringify(this.newPatientDetails));
        this.educationalInstitutionsApplicantService.getAllEducationalInstitutionByUserIdStatus
          (this.user.id, "הווה      ").subscribe(arrIns => {
            if (arrIns.length == 0) {
              this.newEducationalInstitutionsApplicant = new EducationalInstitutionsApplicant();
            }
            if (arrIns.length > 0) {
              debugger
              this.newEducationalInstitutionsApplicant = arrIns[0];
              //סוג
              if (this.newEducationalInstitutionsApplicant.institution?.idCategoryNavigation?.detailsCategory)
                this.chooseCategory =
                  this.newEducationalInstitutionsApplicant.institution?.idCategoryNavigation?.detailsCategory
              //שם הישיבה 
              if (this.newEducationalInstitutionsApplicant.institution?.institutionName)
                this.selectedValueNameIns = this.newEducationalInstitutionsApplicant.institution?.institutionName
              //כיתת לימוד
              if (this.newEducationalInstitutionsApplicant.details)
                this.selectedValueClassL = this.newEducationalInstitutionsApplicant.details
            }
          },
            err => { console.log("error") });
      }
    }

    let arrCate = sessionStorage.getItem('currentListCategory');
    if (arrCate == '[]' || arrCate == null) {
      this.institutionsCategoryService.GetAllInstitutionsCategoriesByGenderAndAge
        (this.newPatientDetails.gender, this.newPatientDetails.ageFillApply).subscribe(arrInsCategory => {
          this.arrayCategory = arrInsCategory;
          sessionStorage.setItem("currentListCategory", JSON.stringify(arrInsCategory));
        },
          err => { console.log("error") });
    }
    else {
      if (arrCate != null)
        this.arrayCategory = JSON.parse(arrCate) as InstitutionsCategory[];

    }
  }
  onSelectedValueNameIns(ins: any) {
    this.isAnotherInstiton = false;
    this.notExistCity = false;
    if (this.currentCategory.id == null) {
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
  deleteCurrentIns() {
    this.isUpdate = false;
    const dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      result.delete && this.deleteIns();
    });
  }
  deleteIns() {
    this.opentLastEdu = false;
    if (this.newEducationalInstitutionsApplicant.id) {
      this.educationalInstitutionsApplicantService.deleteEducational(this.newEducationalInstitutionsApplicant.id).
        subscribe(result => {
          this.newEducationalInstitutionsApplicant = new EducationalInstitutionsApplicant();
          //סוג
          this.chooseCategory = ""
          //שם הישיבה 
          this.selectedValueNameIns = ""
          //כיתת לימוד
          this.selectedValueClassL = ""
        },
          err => { console.log("error") });
    }
  }
  updateIns() {
    this.opentLastEdu = false;
    this.id = this.newEducationalInstitutionsApplicant.id;
    this.newEducationalInstitutionsApplicant.id = undefined;
    this.isUpdate = true;
    this.chooseCategory = "" +
      this.newEducationalInstitutionsApplicant.institution?.idCategoryNavigation?.detailsCategory
  }
  onSelectedValueChangeCategory(category: any) {
    debugger
    this.isPressCategory = false;
    this.currentCategory = category;
    this.chooseCategory = "" + this.currentCategory.detailsCategory;
    this.indexCategory = this.arrayCategory.findIndex(c => c.id == category.id);
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
      // this.chooseArrayLeave = this.arrayYLeave;
    }
    else if (category.id == 3) {
      this.chooseArray = this.arrayK;
      // this.chooseArrayLeave = this.arrayYLeave;
    }
    else {
      this.chooseArray = this.arrayC;
      // this.chooseArrayLeave = this.arrayCLeave;
    }
  }
  next() {
    this.newPatientDetails.isInstition = true;
    sessionStorage.setItem("currentPatientDetails", JSON.stringify(this.newPatientDetails));
    if (this.isAnotherInstiton || this.notExistCity)
      this.addAddressCity();
    else
      this.addEducational()
  }
  //הוספת עיר/ כתובת חדשה
  addAddressCity() {
    this.addressService.AddAddress(this.newAddressE).subscribe(idAddress => {
      this.newEducationalInstitution.addressId = idAddress;
      this.newEducationalInstitution.idCategory = this.currentCategory.id;
      this.educationalInstitutionService.AddEducationalInstitution(this.newEducationalInstitution)
        .subscribe(idNewInst => {
          this.newEducationalInstitutionsApplicant.institutionId = idNewInst;
          this.notExistCity = false;
          this.isAnotherInstiton = false;
          this.educationalInstitutionService.GetAllInstitutionsByCategories(this.currentCategory.id)
            .subscribe(allEducational => {
              this.arrayEducational = allEducational;
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
    if (this.isUpdate) {
      this.newEducationalInstitutionsApplicant.id = this.id;
      this.newEducationalInstitutionsApplicant.details = "" + this.selectedValueClassL;
      this.newEducationalInstitutionsApplicant.institutionId = this.currentChooseEdu.id;
      this.educationalInstitutionsApplicantService.updateEducational(this.id, this.newEducationalInstitutionsApplicant)
        .subscribe(idEduAp => {
          this.isUpdate = false;
          this.educationalInstitutionsApplicantService.getAllEducationalInstitutionByUserIdStatus(this.user.id, "הווה      ").subscribe(arrIns => {
            if (arrIns.length > 0)
              this.newEducationalInstitutionsApplicant = arrIns[0];
            if (this.newEducationalInstitutionsApplicant.institution?.idCategoryNavigation?.detailsCategory)
              this.chooseCategory =
                this.newEducationalInstitutionsApplicant.institution?.idCategoryNavigation?.detailsCategory

          },
            err => { console.log("error") });
          for (let index = this.indexCategory; index < this.arrayCategory.length; index++) {
            this.arrayNewCategory.push(this.arrayCategory[index]);
          }
          sessionStorage.setItem("currentListCategory", JSON.stringify(this.arrayNewCategory));
          this.arrayNewCategory = [];
        },
          err => { console.log("error") });

    }
    else {
      this.newEducationalInstitutionsApplicant.userId = this.user.id;
      this.newEducationalInstitutionsApplicant.status = "הווה";
      this.newEducationalInstitutionsApplicant.details = "" + this.selectedValueClassL;
      this.newEducationalInstitutionsApplicant.institutionId = this.currentChooseEdu.id;
      this.educationalInstitutionsApplicantService.AddEducational(this.newEducationalInstitutionsApplicant)
        .subscribe(idEduAp => {
          this.opentLastEdu = true;
          this.educationalInstitutionsApplicantService.getAllEducationalInstitutionByUserIdStatus(this.user.id, "הווה      ").subscribe(arrIns => {
            if (arrIns.length > 0)
              this.newEducationalInstitutionsApplicant = arrIns[0];
            if (this.newEducationalInstitutionsApplicant.institution?.idCategoryNavigation?.detailsCategory)
              this.chooseCategory =
                this.newEducationalInstitutionsApplicant.institution?.idCategoryNavigation?.detailsCategory

          },
            err => { console.log("error") });
          debugger
          for (let index = this.indexCategory; index < this.arrayCategory.length; index++) {
            this.arrayNewCategory.push(this.arrayCategory[index]);
          }
          sessionStorage.setItem("currentListCategory", JSON.stringify(this.arrayNewCategory));
          this.arrayNewCategory = [];
        },
          err => { console.log("error") });
    }
  }





  resizeTextarea(textarea: any) {
    this.renderer.setStyle(textarea, 'height', 'auto');
    this.renderer.setStyle(textarea, 'height', textarea.scrollHeight + 'px');
  }
  saveAndUpdateDetailsCause() {
    this.applyService.UpdateApply(this.numApply, this.currentApply).subscribe(resultApply => {
    },
      err => { console.log("error") });
  }
  getErrorMessageRefferalB() {
    if (this.form.get('refferalB')?.hasError('refferalB')) {
      return '  שדה חובה   ';
    }
    return "";
  }


  getCurrentApply() {
    this.applyService.getApplyById(this.numApply).subscribe(apply => {
      if (apply != null)
        this.currentApply = apply;
    },
      err => { console.log("error") });
  }
  getErrorMessageMobileNumber() {
    if (this.form.get('mobileNumber')?.hasError('required')) {
      return '  שדה חובה   ';
    }
    return this.form.get('mobileNumber')?.hasError('pattern') ? '  מספר טלפון שגוי   ' : '';
  } getErrorMessageMobileNumberC() {
    if (this.form.get('mobileNumberC')?.hasError('required')) {
      return '  שדה חובה   ';
    }
    return this.form.get('mobileNumberC')?.hasError('pattern') ? '  מספר טלפון שגוי   ' : '';
  }
  getErrorMessageMobileNumberM() {
    if (this.form.get('mobileNumberM')?.hasError('required')) {
      return '  שדה חובה   ';
    }
    return this.form.get('mobileNumberM')?.hasError('pattern') ? '  מספר טלפון שגוי   ' : '';
  }
  getErrorMessageMobileNumberP() {
    if (this.form.get('mobileNumberP')?.hasError('required')) {
      return '';
    }
    return this.form.get('mobileNumberP')?.hasError('pattern') ? '  מספר טלפון שגוי   ' : '';
  }
  getErrorMessageHebrewLettersF() {
    if (this.form.get('hebrewLettersF')?.hasError('required')) {
      return '  שדה חובה   ';
    }
    return this.form.get('hebrewLettersF')?.hasError('pattern') ? '  אותיות עברית בלבד ' : '';
  }
  getErrorMessageHebrewLettersTExtA() {
    if (this.form.get('textAreaHeb')?.hasError('required')) {
      return '  שדה חובה   ';
    }
    return this.form.get('textAreaHeb')?.hasError('pattern') ? '  אותיות עברית בלבד ' : '';
  }
  getErrorMessageHebrewLettersL() {
    if (this.form.get('hebrewLettersL')?.hasError('required')) {
      return '  שדה חובה   ';
    }
    return this.form.get('hebrewLettersL')?.hasError('pattern') ? '  אותיות עברית בלבד ' : '';
  }
  getErrorMessageNumber() {
    if (this.form.get('numberV')?.hasError('required')) {
      return '  שדה חובה   ';
    }
    return this.form.get('numberV')?.hasError('pattern') ? '   מספר ילדים בין 1-25 בלבד  ' : 'מספר ילדים בין 1-25 בלבד';
  }
  getErrorMessageNumberV() {
    if (this.form.get('numberVV')?.hasError('required')) {
      return '  שדה חובה   ';
    }
    return this.form.get('numberVV')?.hasError('pattern') ? '   מספר ילדים בין 1-25 בלבד  ' : 'מספר ילדים בין 1-25 בלבד';
  }
  getErrorMessageAge() {
    if (this.form.get('ageV')?.hasError('required')) {
      return '  שדה חובה   ';
    }
    return this.form.get('ageV')?.hasError('pattern') ? '  גיל אינו חוקי אנא הקלד גיל בין 6 ל-99 ' : '';
  }
  validPlace() {
    if (this.newFamily.childrenNumber != null && this.newPatientDetails.familyPlace != null) {
      if (this.newFamily.childrenNumber < this.newPatientDetails.familyPlace)
        return false;
      else return true;
    }
    else {
      return true;
    }
  }

  //selectSector
  onSelectedValueChangeSector(value: any) {
    this.isAnotherSector = false;
    const currentSector = this.arraySector.find(s => s.id == value);
    if (currentSector != null && currentSector.id == 4)
      this.isAnotherSector = true;
  }


  // sendValueReferredBy() {
  //   sessionStorage.setItem("detailsAsker", JSON.stringify(this.newDetailsAsker));
  // }
  refrSes() {
    debugger
    sessionStorage.removeItem("currentListCategory");
    sessionStorage.setItem("currentPatientDetails", JSON.stringify(this.newPatientDetails));
    // location.reload();
  }
  onChangeTipul() {

    if (this.form.get('taalich')?.value == true) {
      this.isTipul = true;
      this.newPatientDetails.isTherapeutic = true;
      this.updateSessionPatientDetails();
    }
    else if (this.form.get('taalich')?.value == false) {
      this.isTipul = false;
      this.newPatientDetails.isTherapeutic = false;
      this.updateSessionPatientDetails();
    }
  }
  updateSessiontoTerapist() {
    this.userMetapel.firstName = this.form.get('first')?.value
    this.userMetapel.lastName = this.form.get('last')?.value
    this.userMetapel.phone = this.form.get('mobileNumberM')?.value

    sessionStorage.setItem("userTherapist", JSON.stringify(this.userMetapel));
  }
  updateSessionPatientDetails() {
    sessionStorage.setItem("currentPatientDetails", JSON.stringify(this.newPatientDetails));
  }
  onChangeStillTipul(valuel: any) {
    if (valuel == true) {
      this.newPatientDetails.isStillTerapist = true;
      this.updateSessionPatientDetails();
    }
    else if (valuel == false) {
      this.newPatientDetails.isStillTerapist = false;
      this.updateSessionPatientDetails();

    }
  }

  onChangeIsMatureCharacter() {
    if (this.form.get('p')?.value == true) {
      this.isMatureCaracter = true;
      this.newPatientDetails.isMatureCharacter = true;
      this.updateSessionPatientDetails();
    }
    else if (this.form.get('p')?.value == false) {
      this.isMatureCaracter = false;
      this.newPatientDetails.isMatureCharacter = false;
      this.updateSessionPatientDetails();
    }
  }
  onChangePermissionContact(valuel: any) {
    if (valuel == "true") {
      this.matureCharacter.permissionContact = true;
      this.updateSessiontoCharacter();
    }
    else if (valuel == "false") {
      this.matureCharacter.permissionContact = false;
      this.updateSessiontoCharacter();
    }
  }
  updateSessiontoCharacter() {
    debugger
    this.matureCharacter.permissionContact = (Boolean)(this.form.get('permissionContact')?.value);
    this.matureCharacter.idApplicant = this.numApply;
    sessionStorage.setItem("matureCharacter", JSON.stringify(this.matureCharacter));
  }
  updateUserMetapelC() {
    this.userMetapelC.firstName = this.form.get('hebrewLettersC')?.value;
    this.userMetapelC.phone = this.form.get('mobileNumberC')?.value;
    this.userMetapelC.lastName = this.form.get('hebrewLettersCL')?.value;
    sessionStorage.setItem("userMetapelC", JSON.stringify(this.userMetapelC));
  }

  onInputValueCity(value: any) {
    this.isJerusalem = false
    if (this.newAddress.city == "ירושלים")
      this.isJerusalem = true;
  }

  onChangeIns(valuel: any) {
    this.newFamily.parentStatus = this.form.get('parent')?.value;
    sessionStorage.setItem("currentFamily", JSON.stringify(this.newFamily));
    sessionStorage.setItem("currentAddress", JSON.stringify(this.newAddress));

    if (this.newPatientDetails.gender == "" || this.newPatientDetails.ageFillApply == undefined || (this.newPatientDetails.gender == "" && this.newPatientDetails.ageFillApply == undefined)) {
      alert(" כדי שנוכל לעבור לעבור לשלב הבא יש לבחור מין :זכר / נקבה וכן למלא גיל")
      this.selectedOptionIns = null;
    }
    else {
      console.log(this.selectedOptionIns);
      if (valuel.value == '1') {
        this.newPatientDetails.isInstition = true;
        // this.isPressPP = false;
        if (!this.user.id) {
          this.userService.AddUser(this.user).subscribe(asker => {
            this.newPatientDetails.userId = asker;
            this.user.id = asker;
            sessionStorage.setItem("currentPatientDetails", JSON.stringify(this.newPatientDetails));
            sessionStorage.setItem("userPatientDetails", JSON.stringify(this.user));
          },
            err => { console.log("error") });
        }
        else {
          this.newPatientDetails.userId = this.user.id;
          sessionStorage.setItem("currentPatientDetails", JSON.stringify(this.newPatientDetails));
        }
        //this.myRouter.navigate(['/institutionsCategoryFirst/' + this.numApply + '/' + this.newPatientDetails.gender + '/' + this.age]);
      }
      else if (valuel.value == '2') {
        this.newPatientDetails.isInstition = false;
        sessionStorage.setItem("currentPatientDetails", JSON.stringify(this.newPatientDetails));
        this.isPressPP = false;
        // this.myRouter.navigate(['/institutionsCategory/' + this.numApply + '/' + this.newPatientDetails.gender + '/' + this.age]);
      }
      else if (valuel.value == '3') {
        if (this.isInstitionPast)
          this.isPressMLN = false;
        else
          this.newPatientDetails.isInstition = false;
        sessionStorage.setItem("currentPatientDetails", JSON.stringify(this.newPatientDetails));
        this.isPressPP = true;
      }
    }
  }
  //sent another sector and add it on the list sector
  sendValue(value: any) {
    this.anotherSectorO.detailsSector = value;
    this.sectorService.AddSector(this.anotherSectorO).subscribe(addSector => {
      console.log(this.arraySector);
    },
      err => { console.log("error") });
  }

  // add a user
  addNewUser() {
    if (this.user.id) {
      this.userService.UpdateUser(this.user.id, this.user).subscribe(asker => {
        this.addAddress();
      },
        err => { console.log("error") });
    }
    else {
      this.userService.AddUser(this.user).subscribe(asker => {
        this.user.id = asker;
        this.addAddress();
      },
        err => { console.log("error") });
    }

  }

  //addAddress
  addAddress() {
    if (this.newAddress.id) {
      this.addressService.UpdateAddress(this.newAddress.id, this.newAddress).subscribe(idAddress => {
        this.addFamily();
      }, err => { console.log("error") });
    }
    else {
      this.addressService.AddAddress(this.newAddress).subscribe(idAddress => {
        this.newPatientDetails.addressId = idAddress;
        this.addFamily();
      },
        err => { console.log("error") });
    }
  }

  //addFamily
  addFamily() {
    if (this.newFamily.id) {
      this.familyService.UpdateFamily(this.newFamily.id, this.newFamily).subscribe(idAddress => {
        // this.addDetailsAsker();
        //שליפה לפי מספר פניה של הפרטי פונה
        this.addPatientDetails();

      }, err => { console.log("error") });
    }

    else {
      this.familyService.AddFamily(this.newFamily).subscribe(idFamily => {
        this.newPatientDetails.familyId = idFamily;
        //שליפה לפי מספר פניה של הפרטי פונה
        this.detailsAskerService.getIdDetailsAsker(this.currentApply.askerId)
          .subscribe(idAsker => {
            if (idAsker != 0) {
              this.newPatientDetails.idDetailsAsker = idAsker;
              this.addPatientDetails();
            }
            else {
              alert("לא קיים פונה לפנייה זו!")
            }
          }, err => { console.log("error") });


        // this.addDetailsAsker();

      },
        err => { console.log("error") });
    }
  }
  addDetailsAsker() {
    if (this.currentApply) {
      this.newDetailsAsker.id = undefined
      this.newDetailsAsker.userId = this.currentApply.asker?.id;
      this.newDetailsAsker.idResone = this.currentApply.applyCausedId;
      this.detailsAskerService.AddDetailsAsker(this.newDetailsAsker).subscribe(resultDetails => {
        this.newPatientDetails.idDetailsAsker = resultDetails;
        // this.newDetailsAsker.id=resultDetails;
        this.addPatientDetails();
      },
        err => { console.log("error") });
    }
  }
  //addPatientDetails
  addPatientDetails() {
    debugger
    this.newPatientDetails.diagnoses = this.form.get('diagnoses')?.value;
    this.newPatientDetails.emotional = this.form.get('emotional')?.value;
    this.newPatientDetails.social = this.form.get('social')?.value;
    this.newPatientDetails.studies = this.form.get('studies')?.value;
    this.newPatientDetails.datailsJobTerapist = this.form.get('job')?.value;
    if (this.newPatientDetails.id) {
      this.patientDetailsService.UpdatePatientDetails(this.newPatientDetails.id, this.newPatientDetails).subscribe(idPatient => {
        // this.newPatientDetails.id = idPatient;
        this.addTreatment();
      },
        err => { console.log("error") });
    }
    else {
      this.patientDetailsService.AddPatientDetails(this.newPatientDetails).subscribe(idPatient => {
        // this.newPatientDetails.id = idPatient;
        this.addTreatment();
      },
        err => { console.log("error") });
    }
  }

  //הוספת שלב ביצוע  לסיווג מנהל
  addTreatment() {
    this.newTreatmentDetails.applyId = this.numApply;
    this.newTreatmentDetails.therapistId = this.currentEmployees.id;
    this.newTreatmentDetails.dateNow = new Date();
    this.newTreatmentDetails.taskId = 1012;
    this.newTreatmentDetails.statusId = 2;
    this.newTreatmentDetails.dateTask = new Date();
    this.treatmentDetailsService.AddTreatmentDetails(this.newTreatmentDetails).subscribe(result => {
      const config = new MatSnackBarConfig();
      config.duration = 2000;
      config.direction = 'rtl'
      this.snackBar.open(" פרטי פנייה מספר " + this.numApply + " נקלטו בהצלחה", 'הסר', config);
      sessionStorage.removeItem("currentListCategory");
      sessionStorage.removeItem("userPatientDetails");
      sessionStorage.removeItem("currentPatientDetails");
      sessionStorage.removeItem("currentAddress");
      sessionStorage.removeItem("currentFamily");
      if (this.currentEmployees.job?.id == 1) {
        this.myRouter.navigate(['/manager']);
      }
      else if (this.currentEmployees.job?.id == 3)
        this.myRouter.navigate(['/navigateSecretary']);
      else if (this.currentEmployees.job?.id == 4)
        this.myRouter.navigate(['/inTakeNav']);
      else if (this.currentEmployees.job?.id == 5)
        this.myRouter.navigate(['/navigatePatient']);
    },
      err => { console.log("error") });
  }



  //////////////////////////
  //   updateUser() {
  //     this.userService.UpdateUser(this.newPatientDetails.userId, this.user).subscribe(asker => {
  //       this.updateFamily();
  //     },
  //       err => { console.log("error") });
  //   }
  //   updateFamily() {

  //     this.familyService.UpdateFamily(this.newPatientDetails.familyId, this.newFamily).subscribe(family => {
  //       this.updateAddress();
  //     },
  //       err => { console.log("error") });
  //   }
  //   updateAddress() {

  //     this.addressService.UpdateAddress(this.newPatientDetails.addressId, this.newAddress).subscribe(address => {
  // this.updateDetailsAsker();
  // },
  //       err => { console.log("error") });

  //   }
  //   updateDetailsAsker(){
  //     this.detailsAskerService.UpdateDetailsAsker(this.newDetailsAsker.id,this.newDetailsAsker).subscribe(resultDetails => {
  //     this.newPatientDetails.idDetailsAsker=this.newDetailsAsker.id;
  //     if(this.isNotExistPatient)
  //     this.updatePatientDetails();
  //     else
  //     this.addPatientDetails();
  //     },
  //       err => { console.log("error") });
  //   }
  //   updatePatientDetails() {
  //     this.patientDetailsService.UpdatePatientDetails(this.newPatientDetails.id, this.newPatientDetails).subscribe(patientDetails => {
  //       console.log(patientDetails);
  //     },
  //       err => { console.log("error") });
  //   }

  saveNow() {
    let data = sessionStorage.getItem('currentPatientDetails');
    if (data !== null) {
      this.newPatientDetails = JSON.parse(data) as PatientDetails;
      debugger
      if (this.newPatientDetails.isMatureCharacter == true) {

        let matureCharacter = sessionStorage.getItem('matureCharacter');
        if (matureCharacter !== null) {
          this.newMatureCharacter = JSON.parse(matureCharacter) as MatureCharacter;
          this.addMature();
        }
      }
      if (this.newPatientDetails.isTherapeutic == true) {
        let userTherapist = sessionStorage.getItem('userTherapist');
        if (userTherapist !== null) {
          this.newUserTherapist = JSON.parse(userTherapist) as User;
        }
        this.addUserTherapist();
      }
    }
    let detailsAsker = sessionStorage.getItem('detailsAsker');
    if (detailsAsker !== null) {
      this.newDetailsAsker = JSON.parse(detailsAsker) as DetailsAsker;
    }
    let currentFamily = sessionStorage.getItem('currentFamily');
    if (currentFamily !== null) {
      this.newFamily = JSON.parse(currentFamily) as Family;
    }
    let currentAddress = sessionStorage.getItem('currentAddress');
    if (currentAddress !== null) {
      this.newAddress = JSON.parse(currentAddress) as Address;
    }
    let userPatientDetails = sessionStorage.getItem('userPatientDetails');
    if (userPatientDetails !== null) {
      this.user = JSON.parse(userPatientDetails) as User;
    }
    this.addNewUser();
  }

  addUserTherapist() {
    this.userService.AddUser(this.newUserTherapist).subscribe(terapist => {
      this.newPatientDetails.therapeuticId = terapist;
    },
      err => { console.log("error") })
  }
  addMature() {
    let userMature = sessionStorage.getItem('userMetapelC');
    if (userMature !== null) {
      this.userMature = JSON.parse(userMature) as User;
    }
    if (this.userMature.id) {
      this.addNewMature();
    }
    else {
      this.userService.AddUser(this.userMature).subscribe(terapist => {
        this.newMatureCharacter.idMature = terapist;
        this.addNewMature();
      },
        err => { console.log("error") });
    }
  }
  addNewMature() {
    this.newMatureCharacter.idApplicant = this.numApply;
    if (this.newMatureCharacter.id) {
      return;
    }
    else {
      this.matureCharacterService.AddMatureCharacter(this.newMatureCharacter).subscribe(mature => {
        this.newPatientDetails.matureCharacterId = mature;
      },
        err => { console.log("error") });
    }
  }


  return() {
    this.location.back();
  }
}
