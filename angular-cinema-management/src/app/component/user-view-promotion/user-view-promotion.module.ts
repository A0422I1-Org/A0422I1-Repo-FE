import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserViewPromotionRoutingModule } from './user-view-promotion-routing.module';
import {UserPromotionListComponent} from "./user-promotion-list/user-promotion-list.component";
import {UserPromotionDetailComponent} from "./user-promotion-detail/user-promotion-detail.component";


@NgModule({
  declarations: [
    UserPromotionListComponent,
    UserPromotionDetailComponent,
  ],
  imports: [
    CommonModule,
    UserViewPromotionRoutingModule
  ]
})
export class UserViewPromotionModule { }
