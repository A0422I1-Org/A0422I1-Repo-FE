import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SlidebarComponent} from "./slidebar.component";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    SlidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    SlidebarComponent
  ]
})
export class SlidebarModule { }
