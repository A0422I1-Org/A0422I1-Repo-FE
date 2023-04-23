import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminTicketListComponent} from "./admin-ticket-list/admin-ticket-list.component";
import {AdminReceiveTicketDetailComponent} from "./admin-receive-ticket-detail/admin-receive-ticket-detail.component";


const routes: Routes = [
  {
    path: 'select_ticket_user', component: AdminTicketListComponent
  },
  {
      path:'bookingConfirmation/:id',component:AdminReceiveTicketDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminTicketManagementRoutingModule { }
