import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TargyakRoutingModule } from './targyak-routing.module';
import { TargyakComponent } from './targyak.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [TargyakComponent],
  imports: [
    CommonModule,
    TargyakRoutingModule,
    FormsModule,
  ]
})
export class TargyakModule { }
