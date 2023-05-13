import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: "customer-management",
    loadChildren: () => import('./component/admin-customer-management/admin-customer-management.module').then(module => module.AdminCustomerManagementModule)
  },
  {
    path:"ticket_management",
    loadChildren:() => import ('./component/admin-ticket-management/admin-ticket-management.module').then(module => module.AdminTicketManagementModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
