import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KarakterekRoutingModule } from './karakterek-routing.module';
import { KarakterekComponent } from './karakterek.component';


@NgModule({
  declarations: [
    KarakterekComponent
  ],
  imports: [
    CommonModule,
    KarakterekRoutingModule
  ]
})
export class KarakterekModule { }
