import { NgModule, CUSTOM_ELEMENTS_SCHEMA, } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import{FormsModule,ReactiveFormsModule} from  '@angular/forms';
import { AppComponent } from './app.component';
import { HomePageComponent } from './component/home-page/home-page.component';
import { LoginComponent } from './component/login/login.component';
import { ForgetPasswordComponent } from './component/forget-password/forget-password.component';
import { EmployeeService } from './Services/employee.service';
import { UserService } from './Services/user.service';
import { ReferenceManagerComponent } from './component/reference-manager/reference-manager.component';
import { CodeSendComponent } from './component/code-send/code-send.component';
import { NewPasswordComponent } from './component/new-password/new-password.component';
import { NavigateSecretaryComponent } from './component/navigate-secretary/navigate-secretary.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatSelectModule} from '@angular/material/select';
import { InTakeNavComponent } from './component/in-take-nav/in-take-nav.component';
import { FillNewApplyComponent } from './component/fill-new-apply/fill-new-apply.component'; 
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule  } from '@angular/material/snack-bar';
import {MatError} from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import { EducationalInstitutionsComponent } from './component/educational-institutions/educational-institutions.component';
import { EducationalInstitutionsApplicantComponent } from './component/educational-institutions-applicant/educational-institutions-applicant.component';
import { NewApplySecreteryComponent } from './component/new-apply-secretery/new-apply-secretery.component';
import {MatCardModule} from '@angular/material/card';

// search module
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {MatTableModule} from '@angular/material/table';
import { SearchPipe } from './search.pipe';
import { ShowDetailsApplyComponent } from './component/show-details-apply/show-details-apply.component';
import { AsyncPipe, DatePipe } from '@angular/common';
import { PatientDetailsComponent } from './component/patient-details/patient-details.component';
import { NewTreatmentDetailsComponent } from './component/new-treatment-details/new-treatment-details.component';
import {MatIconModule} from '@angular/material/icon';
import { SystemActivityComponent } from './component/system-activity/system-activity.component';
import { WaitPageComponent } from './component/wait-page/wait-page.component';
import { NavigatePatientComponent } from './component/navigate-patient/navigate-patient.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import {MatBadgeModule} from '@angular/material/badge';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import { VisionComponent } from './component/vision/vision.component';
import { MatSortModule } from '@angular/material/sort';
import { DeleteDialogComponent } from './component/delete-dialog/delete-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CalenderComponent } from './component/calender/calender.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginComponent,
    ForgetPasswordComponent,
    ReferenceManagerComponent,
    CodeSendComponent,
    NewPasswordComponent,
    NavigateSecretaryComponent,
    InTakeNavComponent,
    FillNewApplyComponent,
    EducationalInstitutionsComponent,
    EducationalInstitutionsApplicantComponent,
    NewApplySecreteryComponent,
    SearchPipe,
    ShowDetailsApplyComponent,
    PatientDetailsComponent,
    NewTreatmentDetailsComponent,
    SystemActivityComponent,
    WaitPageComponent,
    NavigatePatientComponent,
    HeaderComponent,
    FooterComponent,
    VisionComponent,
    DeleteDialogComponent,
    CalenderComponent
  ],
  imports: [
    MatAutocompleteModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatRadioModule,
    // MatPaginator,
   // MatTableDataSource
   MatTableModule,
   Ng2SearchPipeModule,
   MatIconModule,
   BrowserAnimationsModule,
   MatCardModule,
   MatBadgeModule,
   MatMenuModule,
   MatPaginatorModule,
   MatSortModule,
   MatDialogModule
  //  MatTableDataSource
  //  NgxTimepickerModule
  ],
  providers: [EmployeeService,DatePipe,UserService , { provide: MAT_DATE_LOCALE, useValue: 'he' }],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
