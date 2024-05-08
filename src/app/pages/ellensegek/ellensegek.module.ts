import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EllensegekRoutingModule } from './ellensegek-routing.module';
import { EllensegekComponent } from './ellensegek.component';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { TruncatePipe } from '../../shared/services/truncate.pipe';

@NgModule({
  declarations: [
    EllensegekComponent,TruncatePipe
  ],
  imports: [
    CommonModule,
    EllensegekRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSortModule,
  ]
})
export class EllensegekModule { }
