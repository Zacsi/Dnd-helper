import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MyheroRoutingModule } from './myhero-routing.module';
import { MyheroComponent } from './myhero.component';


@NgModule({
  declarations: [MyheroComponent],
  imports: [
    CommonModule,
    MyheroRoutingModule,
    ReactiveFormsModule 
  ]
})
export class MyheroModule { }