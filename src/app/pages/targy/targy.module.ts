import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TargyRoutingModule } from './targy-routing.module';
import { TargyComponent } from './targy.component';



@NgModule({
  declarations: [TargyComponent],
  imports: [
    CommonModule,
    TargyRoutingModule
  ]
})
export class TargyModule { }
