import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from "./component/register/register.component";


const routes: Routes = [
  {
    path: "customer",
    loadChildren: () => import('./component/user-account-management/user-account-management.module').then(module => module.UserAccountManagementModule)
  },
  {path: 'register', component: RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
