import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminEmployeeManagementRoutingModule } from './admin-employee-management-routing.module';
import {AdminEmployeeListComponent} from "./admin-employee-list/admin-employee-list.component";
import {AdminEmployeeCreateComponent} from "./admin-employee-create/admin-employee-create.component";
import {AdminEmployeeEditComponent} from "./admin-employee-edit/admin-employee-edit.component";


@NgModule({
  declarations: [
    AdminEmployeeListComponent,
    AdminEmployeeCreateComponent,
    AdminEmployeeEditComponent,
  ],
  imports: [
    CommonModule,
    AdminEmployeeManagementRoutingModule
  ]
})
export class AdminEmployeeManagementModule { }
