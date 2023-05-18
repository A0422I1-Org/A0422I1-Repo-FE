import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserTicketManagementComponent} from "./user-ticket-management/user-ticket-management.component";
import {UserPointHistoryComponent} from "./user-point-history/user-point-history.component";
import {UserAccountInformationComponent} from "./user-account-information/user-account-information.component";


const routes: Routes = [
  {
    path: "ticket", component: UserTicketManagementComponent
  },
  {
    path: "point", component: UserPointHistoryComponent
  },
  {
    path: "update-profie", component: UserAccountInformationComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserAccountManagementRoutingModule {
}
