import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {UserViewPromotionModule} from "src/app/component/user-view-promotion/user-view-promotion.module";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './component/login/login.component';
import {RegisterComponent} from './component/register/register.component';
import {HeaderComponent} from './component/header/header.component';
import {FooterComponent} from './component/footer/footer.component';
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        HeaderComponent,
        FooterComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        UserViewPromotionModule,
    ],
    providers: [],
    exports: [
        HeaderComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
