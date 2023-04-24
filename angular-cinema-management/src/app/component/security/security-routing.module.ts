import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ResetPasswordComponent} from "./reset-password/reset-password.component";
import {LoginComponent} from "./login/login.component";
import {VerificationComponent} from "./verification/verification.component";
import {VerifyResetPasswordComponent} from "./verify-reset-password/verify-reset-password.component";


const routes: Routes = [
  {path:'login',component: LoginComponent},
  {path:'verification',component: VerificationComponent},
  {path:'reset-password',component: ResetPasswordComponent},
  {path:'verify-reset-password',component: VerifyResetPasswordComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule {
}
