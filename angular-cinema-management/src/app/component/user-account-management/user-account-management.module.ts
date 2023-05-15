import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserAccountManagementRoutingModule } from './user-account-management-routing.module';
import {UserAccountInformationComponent} from "./user-account-information/user-account-information.component";
import {UserTicketManagementComponent} from "./user-ticket-management/user-ticket-management.component";
import {UserPointHistoryComponent} from "./user-point-history/user-point-history.component";
import {ReactiveFormsModule} from "@angular/forms";
import {HeaderCommonModule} from "../header/header-common/header-common.module";
import {FooterModule} from "../footer/footer.module";


@NgModule({
  declarations: [
    UserAccountInformationComponent,
    UserTicketManagementComponent,
    UserPointHistoryComponent,
  ],
  imports: [
    CommonModule,
    UserAccountManagementRoutingModule,
    ReactiveFormsModule,
    HeaderCommonModule,
    FooterModule
  ]
})
export class UserAccountManagementModule { }
