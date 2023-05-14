import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminCustomerEditComponent} from "./admin-customer-edit/admin-customer-edit.component";
import {AdminCustomerListComponent} from "./admin-customer-list/admin-customer-list.component";
import {AuthGuardService} from "../../service/security/auth-guard.service";


const routes: Routes = [
  {
    path: "",
    component: AdminCustomerListComponent,
  },
  {
    path: "update/:id",
    component: AdminCustomerEditComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminCustomerManagementRoutingModule { }
