import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {UserViewPromotionModule} from "src/app/component/user-view-promotion/user-view-promotion.module";
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {UserViewMovieModule} from "./component/user-view-movie/user-view-movie.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {SecurityModule} from "./component/security/security.module";
import {ToastrModule} from "ngx-toastr";
import {NgxPaginationModule} from "ngx-pagination";
import {AdminMovieManagementModule} from "./component/admin-movie-management/admin-movie-management.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

// Import login-google
import {SocialLoginModule, SocialAuthServiceConfig} from 'angularx-social-login';
import {
  GoogleLoginProvider,
} from 'angularx-social-login';
import {AdminStatisticalModule} from "./component/admin-statistical/admin-statistical.module";
import {AdminStatisticalRoutingModule} from "./component/admin-statistical/admin-statistical-routing.module";
import {LoginComponent} from "./component/security/login/login.component";
import {AngularFireModule} from "@angular/fire";
import {environment} from "../environments/environment";
import {AngularFireStorageModule} from "@angular/fire/storage";
import {AppComponent} from "./app.component";
import {RegisterComponent} from "./component/register/register.component";
import {UserAccountManagementModule} from "./component/user-account-management/user-account-management.module";

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    UserViewMovieModule,
    UserViewPromotionModule,
    NgxPaginationModule,
    FormsModule,
    AdminMovieManagementModule,
    AdminStatisticalModule,
    AdminStatisticalRoutingModule,
    ReactiveFormsModule,
    SecurityModule,
    AdminStatisticalModule,
    AdminStatisticalRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    ToastrModule.forRoot(
      {
        timeOut: 5000,
        positionClass: 'toast-top-right'
      }
    ),
    SocialLoginModule,
    ToastrModule.forRoot(
      {
        timeOut: 2000,
        positionClass: 'toast-top-right'
      }
    )
  ],
  providers: [{
    provide: 'SocialAuthServiceConfig',
    useFactory: provideConfig,
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '631867203803-gfnbuj33563dmuorhmfm6cv2prqasulq.apps.googleusercontent.com'
          )
        },
      ]
      /*- comment tam do bi bao loi app module
      ,
      onError: (err) => {
        console.error(err);
      }
       */
    } as SocialAuthServiceConfig,
  }],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
