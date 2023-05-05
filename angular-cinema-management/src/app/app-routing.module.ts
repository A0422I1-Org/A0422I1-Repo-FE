import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegisterComponent} from "./component/register/register.component";
import {UserAccountInformationComponent} from "./component/user-account-management/user-account-information/user-account-information.component";


const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'update-profie/:username', component: UserAccountInformationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
