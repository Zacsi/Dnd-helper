import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TargyakRoutingModule } from './targyak-routing.module';
import { TargyakComponent } from './targyak.component';


@NgModule({
  declarations: [TargyakComponent],
  imports: [
    CommonModule,
    TargyakRoutingModule
  ]
})
export class TargyakModule { }
