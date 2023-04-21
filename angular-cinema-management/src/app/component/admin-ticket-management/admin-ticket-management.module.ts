import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminTicketManagementRoutingModule } from './admin-ticket-management-routing.module';
import {AdminTicketListComponent} from "./admin-ticket-list/admin-ticket-list.component";
import {AdminReceiveTicketConfirmationComponent} from "./admin-receive-ticket-confirmation/admin-receive-ticket-confirmation.component";
import {AdminReceiveTicketDetailComponent} from "./admin-receive-ticket-detail/admin-receive-ticket-detail.component";
import {ToastrModule} from "ngx-toastr";


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
    AdminTicketManagementRoutingModule,
    ToastrModule.forRoot((
      {
        positionClass: 'toast-top-right',
        timeOut:3000
      }
    ))
  ]
})
export class AdminTicketManagementModule { }
