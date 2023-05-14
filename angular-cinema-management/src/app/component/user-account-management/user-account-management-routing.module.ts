import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserTicketManagementComponent} from "./user-ticket-management/user-ticket-management.component";
import {UserPointHistoryComponent} from "./user-point-history/user-point-history.component";


const routes: Routes = [
  {
    path: "ticket", component: UserTicketManagementComponent
  },
  {
    path: "point", component: UserPointHistoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserAccountManagementRoutingModule { }
