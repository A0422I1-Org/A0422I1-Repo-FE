import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path : "promotion" ,
    loadChildren:() => import('./component/user-view-promotion/user-view-promotion.module').then(module =>module.UserViewPromotionModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
