import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminEmployeeListComponent} from "./admin-employee-list/admin-employee-list.component";


const routes: Routes = [
  {path: 'employee',component: AdminEmployeeListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminEmployeeManagementRoutingModule { }
