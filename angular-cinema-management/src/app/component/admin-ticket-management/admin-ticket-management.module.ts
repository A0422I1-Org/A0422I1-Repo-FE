import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminTicketManagementRoutingModule } from './admin-ticket-management-routing.module';
import {AdminTicketListComponent} from "./admin-ticket-list/admin-ticket-list.component";
import {AdminReceiveTicketConfirmationComponent} from "./admin-receive-ticket-confirmation/admin-receive-ticket-confirmation.component";
import {AdminReceiveTicketDetailComponent} from "./admin-receive-ticket-detail/admin-receive-ticket-detail.component";


@NgModule({
  declarations: [
    AdminTicketListComponent,
    AdminReceiveTicketConfirmationComponent,
    AdminReceiveTicketDetailComponent,
  ],
  imports: [
    CommonModule,
    AdminTicketManagementRoutingModule
  ]
})
export class AdminTicketManagementModule { }
