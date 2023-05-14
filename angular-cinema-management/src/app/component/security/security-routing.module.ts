import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ResetPasswordComponent} from "./reset-password/reset-password.component";
import {LoginComponent} from "./login/login.component";
import {VerificationComponent} from "./verification/verification.component";
import {VerifyResetPasswordComponent} from "./verify-reset-password/verify-reset-password.component";
import {AuthGuardService} from "../../service/security/auth-guard.service";


const routes: Routes = [
  {path:'login',component: LoginComponent},
  {path:'verification',component: VerificationComponent, canActivate: [AuthGuardService]},
  {path:'reset-password',component: ResetPasswordComponent, canActivate: [AuthGuardService]},
  {path:'verify-reset-password',component: VerifyResetPasswordComponent, canActivate: [AuthGuardService]},
  {path:'**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule {
}
