import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminEmployeeManagementRoutingModule } from './admin-employee-management-routing.module';
import {AdminEmployeeListComponent} from "./admin-employee-list/admin-employee-list.component";
import {AdminEmployeeCreateComponent} from "./admin-employee-create/admin-employee-create.component";
import {AdminEmployeeEditComponent} from "./admin-employee-edit/admin-employee-edit.component";
import {ToastrModule, ToastrService} from "ngx-toastr";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AdminEmployeeListComponent,
    AdminEmployeeCreateComponent,
    AdminEmployeeEditComponent,
  ],
  exports: [
    AdminEmployeeListComponent
  ],
  imports: [
    CommonModule,
    AdminEmployeeManagementRoutingModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(
      {
        timeOut: 2000,
        positionClass: 'toast-top-right'
      }
    ),
  ]
})
export class AdminEmployeeManagementModule { }
