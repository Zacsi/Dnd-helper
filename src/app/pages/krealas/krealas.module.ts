import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KrealasRoutingModule } from './krealas-routing.module';
import { KrealasComponent } from './krealas.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    KrealasComponent,
  
  ],
  imports: [
    CommonModule,
    KrealasRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    KrealasComponent 
  ]
})
export class KrealasModule { }
