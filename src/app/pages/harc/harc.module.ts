import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HarcRoutingModule } from './harc-routing.module';
import { HarcComponent } from './harc.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSliderModule } from '@angular/material/slider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';





@NgModule({
  declarations: [HarcComponent],
  imports: [
    CommonModule,
    HarcRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSliderModule,
    MatDialogModule,
    MatInputModule
  ],
  exports: [
    HarcComponent 
  ]
})
export class HarcModule { }