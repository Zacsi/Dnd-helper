import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HarcRoutingModule } from './harc-routing.module';
import { HarcComponent } from './harc.component';



@NgModule({
  declarations: [HarcComponent],
  imports: [
    CommonModule,
    HarcRoutingModule,
    FormsModule,
    ReactiveFormsModule 
  ],
  exports: [
    HarcComponent 
  ]
})
export class HarcModule { }