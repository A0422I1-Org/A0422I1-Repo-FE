import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminTicketManagementRoutingModule } from './admin-ticket-management-routing.module';
import {AdminTicketListComponent} from "./admin-ticket-list/admin-ticket-list.component";
import {AdminReceiveTicketConfirmationComponent} from "./admin-receive-ticket-confirmation/admin-receive-ticket-confirmation.component";
import {AdminReceiveTicketDetailComponent} from "./admin-receive-ticket-detail/admin-receive-ticket-detail.component";
import {ToastrModule} from "ngx-toastr";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppRoutingModule} from "../../app-routing.module";
import {RouterModule} from "@angular/router";
import {SlidebarModule} from "../slidebar/slidebar.module";


@NgModule({
  declarations: [
    AdminTicketListComponent,
    AdminReceiveTicketConfirmationComponent,
    AdminReceiveTicketDetailComponent,
  ],
  exports: [
    AdminTicketListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AdminTicketManagementRoutingModule,
    SlidebarModule
  ]
})
export class AdminTicketManagementModule { }
