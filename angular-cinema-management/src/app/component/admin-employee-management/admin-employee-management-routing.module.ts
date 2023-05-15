import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminEmployeeListComponent} from "./admin-employee-list/admin-employee-list.component";
import {AdminEmployeeCreateComponent} from "./admin-employee-create/admin-employee-create.component";
import {AdminEmployeeEditComponent} from "./admin-employee-edit/admin-employee-edit.component";


const routes: Routes = [
  {path: 'employee',component: AdminEmployeeListComponent},
  {
    path: "addEmployee",
    component: AdminEmployeeCreateComponent
  },
  {
    path: "update/:id",
    component: AdminEmployeeEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminEmployeeManagementRoutingModule { }
