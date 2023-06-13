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
import { InstitutionsCategoryComponent } from './component/institutions-category/institutions-category.component';
import { EducationalInstitutionsApplicantComponent } from './component/educational-institutions-applicant/educational-institutions-applicant.component';
import { DetailsApplicantsComponent } from './component/details-applicants/details-applicants.component';
import { NewApplySecreteryComponent } from './component/new-apply-secretery/new-apply-secretery.component';
import { InstitutionsCategoryFirstComponent } from './component/institutions-category-first/institutions-category-first.component';
import { ShowDetailsApplyComponent } from './component/show-details-apply/show-details-apply.component';
import { AwaitingExecutionComponent } from './component/awaiting-execution/awaiting-execution.component';
import { NewTratmentDetailsManagerComponent } from './component/new-tratment-details-manager/new-tratment-details-manager.component';
import { SystemActivityComponent } from './component/system-activity/system-activity.component';
import { StatusApplyManagerComponent } from './component/status-apply-manager/status-apply-manager.component';
import { AwaitingClassificationComponent } from './component/awaiting-classification/awaiting-classification.component';
import { AllApplyManagerComponent } from './component/all-apply-manager/all-apply-manager.component';
import { NavigatePatientComponent } from './component/navigate-patient/navigate-patient.component';
import { VisionComponent } from './component/vision/vision.component';
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
// {path:"detailsApplicants",component:DetailsApplicantsComponent},
{path:"newApplySecretery",component:NewApplySecreteryComponent},
{path:"showDetailsApply",component:ShowDetailsApplyComponent},
{path:"navigatePatient",component:NavigatePatientComponent},
{path:"awaitingExecution",component:AwaitingExecutionComponent},

{path:"newPassword",component:NewPasswordComponent},
{path:"newTratmentDetailsManager/:id",component:NewTratmentDetailsManagerComponent},
{path:"detailsApplicants/:id",component:DetailsApplicantsComponent},
// 'myroute/:param1/:param2'

{path:'educationalInstitutionsApplicant/:id/:indexCategory/:isTvach/:nowInstition',component:EducationalInstitutionsApplicantComponent},
{path:"institutionsCategory/:id/:indexCategory",component:InstitutionsCategoryComponent},
{path:"institutionsCategory/:id/:gender/:age",component:InstitutionsCategoryComponent},

{path:"institutionsCategory/:id",component:InstitutionsCategoryComponent},
{path:"institutionsCategoryFirst/:id/:gender/:age",component:InstitutionsCategoryFirstComponent},
{path:"fillNewApply/:idApply",component:FillNewApplyComponent},
{path:"fillNewApply/:idApply/:isPastEducation",component:FillNewApplyComponent},
{ path: 'showDetailsApply/:id/:sivoug', component: ShowDetailsApplyComponent },
{ path: 'showDetailsApply/:id/:sivoug/:isSec', component: ShowDetailsApplyComponent },
{ path: 'showDetailsApply/:id', component: ShowDetailsApplyComponent },
{path:"forgetPassword",component:ForgetPasswordComponent},
{path:"codeSend",component:CodeSendComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  
 }
