import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderAdminComponent} from "./header-admin.component";

@NgModule({
  imports: [CommonModule],
  declarations: [HeaderAdminComponent],
  exports: [HeaderAdminComponent]
})
export class HeaderAdminModule { }
