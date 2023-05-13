import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerificationComponent } from './verification/verification.component';
import { VerifyResetPasswordComponent } from './verify-reset-password/verify-reset-password.component';
import {ReactiveFormsModule} from "@angular/forms";
import {LoginComponent} from "./login/login.component";
import {ResetPasswordComponent} from "./reset-password/reset-password.component";
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {SecurityRoutingModule} from "./security-routing.module";
import {HeaderModule} from "../header/header.module";
import {FooterModule} from "../footer/footer.module";



@NgModule({
  declarations: [LoginComponent, ResetPasswordComponent, VerificationComponent, VerifyResetPasswordComponent],
  exports: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    SecurityRoutingModule,
    HeaderModule,
    FooterModule
  ]
})
export class SecurityModule { }
