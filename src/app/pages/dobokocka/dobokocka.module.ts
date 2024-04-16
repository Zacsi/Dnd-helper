import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { DobokockaRoutingModule } from './dobokocka-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DobokockaComponent } from './dobokocka.component';
import { FormsModule } from '@angular/forms'; 


@NgModule({
  declarations: [DobokockaComponent],
  imports: [
    CommonModule,
    DobokockaRoutingModule,
    FormsModule
  ]
})
export class DobokockaModule { }
