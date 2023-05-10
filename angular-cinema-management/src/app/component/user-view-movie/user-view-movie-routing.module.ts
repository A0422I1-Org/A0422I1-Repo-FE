import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserMoiveListComponent} from "./user-moive-list/user-moive-list.component";
import {UserMoiveDetailComponent} from "./user-moive-detail/user-moive-detail.component";


const routes: Routes = [

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserViewMovieRoutingModule { }
