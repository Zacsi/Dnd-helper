import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EllensegekRoutingModule } from './ellensegek-routing.module';
import { EllensegekComponent } from './ellensegek.component';



@NgModule({
  declarations: [
    EllensegekComponent
  ],
  imports: [
    CommonModule,
    EllensegekRoutingModule
  ]
})
export class EllensegekModule { }
