import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserPointHistoryComponent} from "./user-point-history/user-point-history.component";
import {UserTicketManagementComponent} from "./user-ticket-management/user-ticket-management.component";


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
export class UserAccountManagementRoutingModule {
}
