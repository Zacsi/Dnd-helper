import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TargyRoutingModule } from './targy-routing.module';
import { TargyComponent } from './targy.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [TargyComponent],
  imports: [
    CommonModule,
    TargyRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TargyModule { }
