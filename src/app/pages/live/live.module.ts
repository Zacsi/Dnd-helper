import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LiveRoutingModule } from './live-routing.module';
import { FormsModule } from '@angular/forms';  // Import FormsModule here
import { LiveComponent } from './live.component';

@NgModule({
  declarations: [LiveComponent],
  imports: [
    CommonModule,
    LiveRoutingModule,
    FormsModule
  ]
})
export class LiveModule { }