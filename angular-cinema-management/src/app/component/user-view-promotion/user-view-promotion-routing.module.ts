import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserPromotionDetailComponent} from "src/app/component/user-view-promotion/user-promotion-detail/user-promotion-detail.component";
import {UserPromotionListComponent} from "src/app/component/user-view-promotion/user-promotion-list/user-promotion-list.component";


const routes: Routes = [
  {path: "", component: UserPromotionListComponent},
  {path: "detail/:id", component: UserPromotionDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserViewPromotionRoutingModule { }
