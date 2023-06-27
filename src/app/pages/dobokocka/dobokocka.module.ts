import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DobokockaRoutingModule } from './dobokocka-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DobokockaComponent } from './dobokocka.component';


@NgModule({
  declarations: [DobokockaComponent],
  imports: [
    CommonModule,
    DobokockaRoutingModule
  ]
})
export class DobokockaModule { }
