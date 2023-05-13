import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path:"ticket_management",
    loadChildren:() => import ('./component/admin-ticket-management/admin-ticket-management.module').then(module => module.AdminTicketManagementModule)
  },
  {
    path:"employee_management",
    loadChildren:() => import ('./component/admin-employee-management/admin-employee-management.module').then(module => module.AdminEmployeeManagementModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
