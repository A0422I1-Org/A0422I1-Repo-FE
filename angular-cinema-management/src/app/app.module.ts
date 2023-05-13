import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RegisterComponent} from './component/register/register.component';
import {HeaderComponent} from './component/header/header.component';
import {FooterComponent} from './component/footer/footer.component';
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {ToastrModule} from "ngx-toastr";

import {ReactiveFormsModule} from "@angular/forms";
import {SecurityModule} from "./component/security/security.module";
import {AdminTicketManagementModule} from "./component/admin-ticket-management/admin-ticket-management.module";
import { SlidebarComponent } from './component/slidebar/slidebar.component';



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
        ReactiveFormsModule,
        SecurityModule,
        ToastrModule.forRoot(
            {
                timeOut: 2000,
                positionClass: 'toast-top-right'
            }
        ),
        AdminTicketManagementModule

    ],
    providers: [],
    exports: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
