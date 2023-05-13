import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './component/register/register.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AdminMovieManagementModule } from "./component/admin-movie-management/admin-movie-management.module";
import { ToastrModule } from "ngx-toastr";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { SecurityModule } from "./component/security/security.module";

// Import login-google
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
} from 'angularx-social-login';
import { AdminStatisticalModule } from "./component/admin-statistical/admin-statistical.module";
import { AdminStatisticalRoutingModule } from "./component/admin-statistical/admin-statistical-routing.module";
import { LoginComponent } from "./component/security/login/login.component";
import {NgxPaginationModule} from "ngx-pagination";

export function provideConfig() {
  return {
    autoLogin: false,
    providers: [
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider(
          '631867203803-gfnbuj33563dmuorhmfm6cv2prqasulq.apps.googleusercontent.com'
        )
      },
    ],
    onError: (err) => {
      console.error(err);
    }
  } as SocialAuthServiceConfig;
}

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    NgxPaginationModule,
    AdminMovieManagementModule,
    AdminStatisticalModule,
    AdminStatisticalRoutingModule,
    ReactiveFormsModule,
    SecurityModule,
    AdminStatisticalModule,
    AdminStatisticalRoutingModule,
    ToastrModule.forRoot(
      {
        timeOut: 2000,
        positionClass: 'toast-top-right'
      }
    ),
    SocialLoginModule,
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
