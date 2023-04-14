import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminCustomerManagementRoutingModule } from './admin-customer-management-routing.module';
import {AdminCustomerEditComponent} from "./admin-customer-edit/admin-customer-edit.component";
import {AdminCustomerListComponent} from "./admin-customer-list/admin-customer-list.component";


@NgModule({
  declarations: [
    AdminCustomerEditComponent,
    AdminCustomerListComponent
  ],
  imports: [
    CommonModule,
    AdminCustomerManagementRoutingModule
  ]
})
export class AdminCustomerManagementModule { }
