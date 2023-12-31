import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CodeSendComponent } from './component/code-send/code-send.component';
import { ForgetPasswordComponent } from './component/forget-password/forget-password.component';
import { FillNewApplyComponent } from './component/fill-new-apply/fill-new-apply.component';
import { InTakeNavComponent } from './component/in-take-nav/in-take-nav.component';
import { LoginComponent } from './component/login/login.component';
import { NavigateSecretaryComponent } from './component/navigate-secretary/navigate-secretary.component';
import { NewPasswordComponent } from './component/new-password/new-password.component';
import { ReferenceManagerComponent } from './component/reference-manager/reference-manager.component';
import { EducationalInstitutionsApplicantComponent } from './component/educational-institutions-applicant/educational-institutions-applicant.component';
import { NewApplySecreteryComponent } from './component/new-apply-secretery/new-apply-secretery.component';
import { ShowDetailsApplyComponent } from './component/show-details-apply/show-details-apply.component';
import { SystemActivityComponent } from './component/system-activity/system-activity.component';
import { NavigatePatientComponent } from './component/navigate-patient/navigate-patient.component';
import { VisionComponent } from './component/vision/vision.component';
import { CalenderComponent } from './component/calender/calender.component';
const routes: Routes = [
{path:"",component:LoginComponent,
children:[ ]},
{path:"forget",component:ForgetPasswordComponent},
{path:"manager",component:ReferenceManagerComponent},
{path:"systemActivity/:id",component:SystemActivityComponent},
{path:"vision",component:VisionComponent},

{path:"navigateSecretary",component:NavigateSecretaryComponent},
{path:"inTakeNav",component:InTakeNavComponent},
{path:"fillNewApply",component:FillNewApplyComponent},
{path:"newApplySecretery",component:NewApplySecreteryComponent},

// פתיחת לשונית חדשה
// {path:"newApplySecretery",component:NewApplySecreteryComponent, data: { externalLink: true }},
{path:"showDetailsApply",component:ShowDetailsApplyComponent},
{path:"navigatePatient",component:NavigatePatientComponent},

{path:"newPassword",component:NewPasswordComponent},
{path:'educationalInstitutionsApplicant/:id/:indexCategory/:isTvach/:nowInstition',component:EducationalInstitutionsApplicantComponent},
{path:"fillNewApply/:idApply",component:FillNewApplyComponent},
{path:"fillNewApply/:idApply/:isPastEducation",component:FillNewApplyComponent},
{ path: 'showDetailsApply/:id/:sivoug', component: ShowDetailsApplyComponent },
{ path: 'showDetailsApply/:id/:sivoug/:isSec', component: ShowDetailsApplyComponent },
{ path: 'showDetailsApply/:id', component: ShowDetailsApplyComponent },
{path:"forgetPassword",component:ForgetPasswordComponent},
{path:"codeSend",component:CodeSendComponent},
{path:"C",component:CalenderComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  
 }
