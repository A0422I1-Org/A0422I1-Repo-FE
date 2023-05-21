import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderCommonComponent} from "./header-common.component";

@NgModule({
  imports: [CommonModule],
  declarations: [HeaderCommonComponent],
  exports: [HeaderCommonComponent]
})
export class HeaderCommonModule { }
