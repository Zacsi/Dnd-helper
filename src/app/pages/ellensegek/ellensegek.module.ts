import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EllensegekRoutingModule } from './ellensegek-routing.module';
import { EllensegekComponent } from './ellensegek.component';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { SharedModule } from '../../shared/services/shared.module';


@NgModule({
  declarations: [
    EllensegekComponent
  ],
  imports: [
    CommonModule,
    EllensegekRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSortModule,
    SharedModule
  ]
})
export class EllensegekModule { }
