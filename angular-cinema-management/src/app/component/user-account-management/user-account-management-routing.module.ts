import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserPointHistoryComponent} from "./user-point-history/user-point-history.component";
import {UserTicketManagementComponent} from "./user-ticket-management/user-ticket-management.component";
import {UserAccountInformationComponent} from "./user-account-information/user-account-information.component";


const routes: Routes = [
  {
    path: "ticket", component: UserTicketManagementComponent
  },
  {
    path: "point", component: UserPointHistoryComponent
  },
  {
    path: 'update-profile/:username', component: UserAccountInformationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserAccountManagementRoutingModule {
}
