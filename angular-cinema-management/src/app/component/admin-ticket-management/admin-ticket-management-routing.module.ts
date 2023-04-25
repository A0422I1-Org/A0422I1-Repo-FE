import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminTicketListComponent} from "./admin-ticket-list/admin-ticket-list.component";
import {AdminReceiveTicketDetailComponent} from "./admin-receive-ticket-detail/admin-receive-ticket-detail.component";
import {AdminReceiveTicketConfirmationComponent} from "./admin-receive-ticket-confirmation/admin-receive-ticket-confirmation.component";


const routes: Routes = [
  {
    path: 'select_ticket_user', component: AdminTicketListComponent
  },
  {
      path:'detailTicket/:id',component:AdminReceiveTicketDetailComponent
  },
  {
    path:'confirmTicket/:id',component:AdminReceiveTicketConfirmationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminTicketManagementRoutingModule { }
