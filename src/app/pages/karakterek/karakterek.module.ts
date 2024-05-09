import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KarakterekRoutingModule } from './karakterek-routing.module';
import { KarakterekComponent } from './karakterek.component';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { SharedModule } from '../../shared/services/shared.module';

@NgModule({
  declarations: [
    KarakterekComponent
  ],
  imports: [
    CommonModule,
    KarakterekRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSortModule,
    SharedModule
  ]
})
export class KarakterekModule { }
