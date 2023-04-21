import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminTicketListComponent} from "./admin-ticket-list/admin-ticket-list.component";


const routes: Routes = [
  {
    path:'select_ticket_user',component: AdminTicketListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminTicketManagementRoutingModule { }
