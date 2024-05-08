import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TargyakRoutingModule } from './targyak-routing.module';
import { TargyakComponent } from './targyak.component';
import { FormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { TruncatePipe } from '../../shared/services/truncate.pipe';


@NgModule({
  declarations: [TargyakComponent,TruncatePipe],
  imports: [
    CommonModule,
    TargyakRoutingModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSortModule,
  ]
})
export class TargyakModule { }
