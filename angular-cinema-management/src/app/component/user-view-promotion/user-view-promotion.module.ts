import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {AppModule} from "src/app/app.module";

import { UserViewPromotionRoutingModule } from './user-view-promotion-routing.module';
import {UserPromotionListComponent} from "./user-promotion-list/user-promotion-list.component";
import {UserPromotionDetailComponent} from "./user-promotion-detail/user-promotion-detail.component";
import {HeaderModule} from "../header/header.module";
import {FooterModule} from "../footer/footer.module";


@NgModule({
  declarations: [
    UserPromotionListComponent,
    UserPromotionDetailComponent,
  ],
  exports: [
    UserPromotionListComponent
  ],
  imports: [
    CommonModule,
    UserViewPromotionRoutingModule,
    FormsModule,
    HeaderModule,
    FooterModule
  ]
})
export class UserViewPromotionModule { }
