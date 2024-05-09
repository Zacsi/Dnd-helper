import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { DobokockaRoutingModule } from './dobokocka-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DobokockaComponent } from './dobokocka.component';
import { FormsModule } from '@angular/forms'; 

import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [DobokockaComponent],
  imports: [
    CommonModule,
    DobokockaRoutingModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class DobokockaModule { }
