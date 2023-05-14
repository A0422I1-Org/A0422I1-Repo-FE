import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminCustomerManagementRoutingModule } from './admin-customer-management-routing.module';
import {AdminCustomerEditComponent} from "./admin-customer-edit/admin-customer-edit.component";
import {AdminCustomerListComponent} from "./admin-customer-list/admin-customer-list.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SlidebarModule} from "../slidebar/slidebar.module";


@NgModule({
  declarations: [
    AdminCustomerEditComponent,
    AdminCustomerListComponent
  ],
  imports: [
    CommonModule,
    AdminCustomerManagementRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SlidebarModule
  ]
})
export class AdminCustomerManagementModule { }
